import chatSitesAttendant from "./chatSitesAttendant"; 
import { realEstateAgents } from "./realEstateAgents/realEstateAgents";
import { ecomAgents } from "./ecomAgents/ecomAgents";
import { healthcareAgents } from "./healthcareAgents/healthcareAgents";
import { financeAgents } from "./financeAgents/financeAgents";
import { educationAgents } from "./educationAgents/educationAgents";

export const allAgentSets: Record<string, AgentConfig[]> = {
  chatSites: [chatSitesAttendant],
  realEstate: realEstateAgents,
  ecommerce: ecomAgents,
  healthcare: healthcareAgents,
  finance: financeAgents,
  education: educationAgents,
};


export const defaultAgentSetKey = "chatSites";

