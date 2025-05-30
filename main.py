import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from openai import AsyncOpenAI
from dotenv import load_dotenv

# Load environment variables (for OPENAI_API_KEY)
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="ReclaimMe API",
    description="Generates professional documents for scam victims using OpenAI.",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Or, for wide-open development (less secure for production)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Initialize OpenAI Async Client
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise RuntimeError("OPENAI_API_KEY environment variable not set. Please create a .env file with your API key.")
client = AsyncOpenAI(api_key=api_key)

# --- Pydantic Models ---
class ScamReportData(BaseModel):
    name: str = Field(..., example="Jane Doe")
    phone: str = Field(..., example="+1234567890")
    email: str = Field(..., example="jane.doe@example.com")
    address: str = Field(..., example="123 Main St, Anytown, USA")
    scamType: str = Field(..., example="Fake Instagram Vendor")
    dateTime: str = Field(..., example="2024-05-15T14:30") # From datetime-local input
    description: str = Field(..., example="Bought shoes from an Instagram ad, paid via bank transfer, never received items, vendor disappeared.")
    amount: str = Field(..., example="USD 150")
    paymentMethod: str = Field(..., example="Bank Transfer")
    beneficiary: str = Field(..., example="Account: 0123456789, Bank: FakeBank Inc, Name: Scammer X")

class GeneratedDocuments(BaseModel):
    police_report_draft: str = Field(..., example="To the [Police Station Name and Address]...")
    bank_complaint_email: str = Field(..., example="Subject: Urgent - Fraudulent Transaction Report - Account [Your Account Number]...")
    next_steps_checklist: str = Field(..., example="1. Finalize and file the police report...")

# --- OpenAI Prompting ---
SYSTEM_PROMPT_JSON = """
You are ReclaimMe, an AI assistant dedicated to helping victims of scams and online fraud.
Your primary function is to generate professional and user-friendly documents based on the victim's report.
These documents include a police report draft, a complaint email to their bank, and a next-steps checklist.

Maintain an empathetic, clear, and highly professional tone.
The language used should be easy for an average user to understand, yet formal enough for official submissions.
Ensure the generated content is actionable and provides genuine assistance to the user.

Your response MUST be a JSON object with the following exact keys: "police_report_draft", "bank_complaint_email", "next_steps_checklist".
The value for each key should be a string containing the respective document.

IMPORTANT: You MUST tailor the content of each document based on the 'Type of Scam' provided by the user in their scam details. Consider the nuances of each scam type when drafting the documents.

General guidance for documents:

1.  **Police Report Draft:**
    * Structure it formally. Include sections for complainant details (using the user's provided name, contact, address), incident details (date, time, amount lost, scammer details if known), a narrative of the event based on the user's description, and details of the financial transaction (payment method, beneficiary).
    * If the scam involves unauthorized access to accounts or computers (e.g., some phishing, tech support scams), explicitly mention this and any known details (e.g., remote access software used).
    * If it involves identity theft elements (e.g., fake job scams, phishing where PII was stolen), highlight the compromise of personal information and what information was lost.
    * Advise the user to fill in specific details like [Police Station Name and Address] or [Officer Name/Badge Number if filing in person].

2.  **Bank Complaint Email Draft:**
    * It should be polite but firm, addressed to the user's bank (use placeholders like [Your Bank Name], [Your Account Number], [Bank's Fraud Department Email/Contact]).
    * Clearly state the purpose: reporting fraudulent transaction(s) and seeking assistance (e.g., chargeback, transaction reversal, account security measures).
    * Clearly link the transaction(s) to the `scamType` and `description` provided.
    * **Specifics based on Scam Type:**
        * **For 'Tech Support Scams':** Mention if remote access was given to the computer, list any software installed by the scammer, specify the service paid for was fraudulent/unnecessary, and request security checks on the account and potentially advice on securing the computer.
        * **For 'Rental Scams':** Specify the address of the fake rental property, the platform where it was advertised (if known), the date and amount of deposit/rent paid, and that the property was non-existent or unavailable.
        * **For 'Phishing Scams resulting in Financial Fraud':** Detail the unauthorized transaction(s), how the phishing likely occurred (e.g., deceptive email leading to fake login page, compromised credentials), and request immediate action to secure the account and reverse charges.
        * **For 'Fake Online Vendor/Marketplace Scams':** Detail the item(s) ordered, website/platform used, date of purchase, amount paid, and the fact that goods were not received or were fake.
        * **For 'Employment Scams':** Specify the fake company name, job title, any fees paid (e.g., for training, equipment), and if personal identifiable information (PII) was compromised for identity theft purposes.

3.  **Next Steps Checklist:**
    * Provide a concise, easy-to-follow list of actions.
    * **Adapt suggestions based on the `scamType`:**
        * **General (Applicable to most):**
            * Officially file the generated police report with your local police department. Keep a copy and the report number.
            * Send the drafted email to your bank's fraud department. Follow up with a phone call if necessary.
            * Gather all evidence: screenshots of conversations, payment confirmations, scammer profiles/websites, relevant emails.
            * Change passwords for accounts involved in the scam, and any other accounts using similar passwords. Use strong, unique passwords and consider a password manager.
            * Enable Two-Factor Authentication (2FA) on all important accounts, especially banking and email.
            * Monitor your bank statements and credit reports regularly for any further suspicious activity.
        * **For 'Tech Support Scams':**
            * Run comprehensive antivirus and anti-malware scans on your computer. Consider professional help if unsure.
            * Revoke any remote access permissions you might have granted.
            * Report the scam to the company the scammers impersonated (e.g., Microsoft, Apple) and to relevant authorities like the Federal Trade Commission (FTC) or your local consumer protection agency (e.g., the Nigerian Communications Commission - NCC, or the Federal Competition and Consumer Protection Commission - FCCPC in Nigeria).
        * **For 'Rental Scams':**
            * Report the fraudulent listing to the website/platform where you found it.
            * If you shared sensitive personal documents, consider placing a fraud alert on your credit file.
        * **For 'Phishing Scams resulting in Financial Fraud':**
            * Report the phishing email/website to the impersonated company directly.
            * Report to authorities like the Anti-Phishing Working Group (APWG) (reportphishing@apwg.org) or local cybercrime units.
            * If identity documents were compromised, report to relevant identity theft resources (e.g., a national identity theft reporting portal if available).
        * **For 'Fake Online Vendor/Marketplace Scams':**
            * Report the seller/profile to the platform (e.g., Instagram, Facebook Marketplace, specific e-commerce site).
            * Leave reviews or comments if possible to warn other potential victims.
        * **For 'Employment Scams':**
            * Report the fake job posting to the platform where it was advertised (e.g., LinkedIn, Indeed).
            * If significant PII was lost, take steps to protect against identity theft (e.g., monitor credit, report to identity theft clearinghouses).
            * Report to relevant labor or consumer protection agencies.

Remember to use the specific information provided by the user (names, dates, amounts, descriptions) to personalize these documents as much as possible. If crucial information for a specific field in a document is missing, use a clear placeholder like "[Specify Detail Here]" and gently remind the user to add it within the text of the document.
"""
 

def create_user_prompt(data: ScamReportData) -> str:
    return f"""
A user has been scammed and needs assistance drafting documents. Please generate a police report draft, a bank complaint email, and a next-steps checklist.

Here are the details of the scam:
- Victim's Name: {data.name}
- Victim's Phone Number: {data.phone}
- Victim's Email Address: {data.email}
- Victim's Residential Address: {data.address}
- Type of Scam: {data.scamType}
- Date and Time of Scam: {data.dateTime}
- Description of the Scam: {data.description}
- Amount Lost: {data.amount}
- Payment Method Used: {data.paymentMethod}
- Beneficiary Account Information (if known): {data.beneficiary}

Based on these details, please generate the three documents as per the system instructions, ensuring the output is a valid JSON object.
"""

# --- API Endpoint ---
@app.post("/generate-documents/", response_model=GeneratedDocuments)
async def generate_documents_endpoint(report_data: ScamReportData):
    """
    Receives scam report data and returns AI-generated documents:
    - Police Report Draft
    - Bank Complaint Email Draft
    - Next Steps Checklist
    """
    user_prompt = create_user_prompt(report_data)
    try:
        response = await client.chat.completions.create(
            model="gpt-4o",  # Or "gpt-4-turbo" - ensure your API key has access
            response_format={"type": "json_object"}, # Enable JSON mode
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT_JSON},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.5, # Balances creativity and factual adherence
            max_tokens=2500  # Adjust based on expected document length
        )

        ai_response_content = response.choices[0].message.content
        
        # The response should be a JSON string, parse it
        try:
            documents_json = json.loads(ai_response_content)
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON from OpenAI: {e}")
            print(f"OpenAI raw response: {ai_response_content}")
            raise HTTPException(status_code=500, detail="Failed to parse AI response as JSON. The AI might not have followed the JSON output instruction.")

        # Validate that the expected keys are in the parsed JSON
        required_keys = ["police_report_draft", "bank_complaint_email", "next_steps_checklist"]
        if not all(key in documents_json for key in required_keys):
            print(f"OpenAI response missing one or more required keys. Received: {documents_json.keys()}")
            raise HTTPException(status_code=500, detail="AI response did not contain all required document fields.")

        return GeneratedDocuments(
            police_report_draft=documents_json.get("police_report_draft", "Error: Police report draft not found in AI response."),
            bank_complaint_email=documents_json.get("bank_complaint_email", "Error: Bank complaint email not found in AI response."),
            next_steps_checklist=documents_json.get("next_steps_checklist", "Error: Next steps checklist not found in AI response.")
        )

    except HTTPException as http_exc: # Re-raise HTTPExceptions
        raise http_exc
    except Exception as e:
        print(f"Error calling OpenAI or processing response: {e}") # Log the error server-side
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred while generating documents: {str(e)}")

# --- How to Run ---
# 1. Ensure you have a .env file in the same directory as main.py with your OPENAI_API_KEY.
# 2. Open your terminal in this directory.
# 3. Run the FastAPI server using Uvicorn:
#    uvicorn main:app --reload
#
# The API will be available at http://127.0.0.1:8000
# You can access the interactive API documentation (Swagger UI) at http://127.0.0.1:8000/docs
