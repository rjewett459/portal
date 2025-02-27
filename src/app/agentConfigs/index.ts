import { AllAgentConfigsType } from "@/app/types";
import realEstateAgents from "./realEstateAgents";
import ecomAgents from "./ecomAgents";
import healthcareAgents from "./healthcareAgents";
import financeAgents from "./financeAgents";
import educationAgents from "./educationAgents";

// src/app/agentConfigs/index.ts

// Define agents by industry (Scenario)
export const allAgentSets: AllAgentConfigsType = {
  "Real Estate": realEstateAgents,
  "E-commerce": ecomAgents,
  "Healthcare": healthcareAgents,
  "Finance": financeAgents,
  "Education": educationAgents,
};

export const defaultAgentSetKey = Object.keys(allAgentSets)[0];


// src/app/agentConfigs/index.ts

// Define agents by industry (Scenario)
export const allAgentSets = {
  "Real Estate": [
    { name: "Property Guide", instructions: "Assist with property searches.", tools: [] },
    { name: "Appointment Setter", instructions: "Schedule property viewings.", tools: [] },
    { name: "Mortgage Advisor", instructions: "Provide mortgage insights.", tools: [] },
  ],
  "E-commerce": [
    { name: "Product Recommender", instructions: "Suggest products to users.", tools: [] },
    { name: "Order Tracking Bot", instructions: "Provide order status updates.", tools: [] },
    { name: "Upsell Agent", instructions: "Recommend related items.", tools: [] },
  ],
  "Healthcare": [
    { name: "Appointment Scheduler", instructions: "Book doctor appointments.", tools: [] },
    { name: "Medication Guide", instructions: "Answer prescription-related queries.", tools: [] },
    { name: "Symptom Checker", instructions: "Provide basic symptom analysis.", tools: [] },
  ],
  "Finance": [
    { name: "Investment Advisor", instructions: "Provide general investment insights.", tools: [] },
    { name: "Loan Consultant", instructions: "Explain loan options.", tools: [] },
    { name: "Banking Support", instructions: "Assist with account-related queries.", tools: [] },
  ],
  "Education": [
    { name: "Course Advisor", instructions: "Help students pick courses.", tools: [] },
    { name: "Tutor Bot", instructions: "Assist with learning topics.", tools: [] },
    { name: "Exam Reminder", instructions: "Track exam deadlines.", tools: [] },
  ],
};

export const defaultAgentSetKey = Object.keys(allAgentSets)[0];

