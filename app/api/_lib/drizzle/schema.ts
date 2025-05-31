import { pgTable, serial } from "drizzle-orm/pg-core"
import {  } from "drizzle-kit"


export const users = pgTable("users", {
   id: serial("id").primaryKey(),
   
})