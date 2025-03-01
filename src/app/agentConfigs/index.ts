import chatSitesAttendant from "./chatSitesAttendant";
import { realEstateAgents } from "./realEstateAgents/realEstateAgents";
import { ecomAgents } from "./ecomAgents/ecomAgents";
import { healthcareAgents } from "./healthcareAgents/healthcareAgents";
import { financeAgents } from "./financeAgents/financeAgents";
import { educationAgents } from "./educationAgents/educationAgents";

export const allAgentSets = {
  chatSites: [chatSitesAttendant], // 🌟 The default agent upon page load
  realEstate: realEstateAgents,
  ecommerce: ecomAgents,
  healthcare: healthcareAgents,
  finance: financeAgents,
  education: educationAgents,
};

export const defaultAgentSetKey = "chatSites"; // 🌟 Ensure the default agent is "ChatSites Attendant"


