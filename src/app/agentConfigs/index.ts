import { AllAgentConfigsType } from "@/app/types";
import realEstateAgents from "./realEstateAgents";
import ecomAgents from "./ecomAgents";
import healthcareAgents from "./healthcareAgents";
import financeAgents from "./financeAgents";
import educationAgents from "./educationAgents";

export const allAgentSets: AllAgentConfigsType = {
  "Real Estate": realEstateAgents,
  "E-commerce": ecomAgents,
  "Healthcare": healthcareAgents,
  "Finance": financeAgents,
  "Education": educationAgents,
};

export const defaultAgentSetKey = Object.keys(allAgentSets)[0];

