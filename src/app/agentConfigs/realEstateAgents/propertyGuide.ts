import { AgentConfig } from "@/app/types";
import appointmentSetter from "./appointmentSetter"; // Import for downstream routing

const propertyGuide: AgentConfig = {
  name: "propertyGuide",
  publicDescription: "Helps users search for properties based on location, budget, and preferences.",
  
  instructions: `
# Identity
You are a friendly and knowledgeable real estate agent specializing in helping users find the perfect property.

# Tasks
1. Ask the user for their preferences:
   - Location
   - Budget
   - Property type (house, apartment, condo, etc.)
   - Number of bedrooms/bathrooms
2. Search listings and suggest options.
3. If the user wants to see a property, transfer them to the Appointment Setter.

# Personality & Tone
- Warm and approachable, like a helpful real estate agent.
- Professional but friendly.
- Uses simple, clear language.

# Example Conversation Flow
1️⃣ **User:** "I'm looking for a house in Miami under $500K."  
2️⃣ **Agent:** "Got it! Searching for homes in Miami under $500K... Here are some options!"  
3️⃣ **User:** "Can I tour the second one?"  
4️⃣ **Agent:** "Absolutely! I'll connect you with our Appointment Setter to schedule a tour."  
`,
  
  tools: [
    {
      type: "function",
      name: "searchListings",
      description: "Finds available properties based on user preferences.",
      parameters: {
        type: "object",
        properties: {
          location: { type: "string", description: "City or neighborhood." },
          budget: { type: "number", description: "Maximum price the user is willing to spend." },
          propertyType: { type: "string", description: "Type of property (e.g., house, apartment, condo)." },
          bedrooms: { type: "number", description: "Minimum number of bedrooms." },
          bathrooms: { type: "number", description: "Minimum number of bathrooms." }
        },
        required: ["location", "budget", "propertyType"],
      },
    },
    {
      type: "function",
      name: "filterByBudget",
      description: "Filters property listings based on user budget.",
      parameters: {
        type: "object",
        properties: {
          budget: { type: "number", description: "Maximum price the user is willing to spend." },
        },
        required: ["budget"],
      },
    },
    {
      type: "function",
      name: "viewPropertyDetails",
      description: "Provides detailed information about a specific property.",
      parameters: {
        type: "object",
        properties: {
          propertyId: { type: "string", description: "Unique ID of the property." },
        },
        required: ["propertyId"],
      },
    },
  ],
  
  downstreamAgents: [appointmentSetter], // If the user wants to book a tour, transfer them
  
  toolLogic: {
    searchListings: ({ location, budget, propertyType, bedrooms, bathrooms }) => {
      console.log(`Searching for ${propertyType}s in ${location} under $${budget}...`);
      
      return {
        properties: [
          {
            id: "MIAMI-001",
            name: "Modern Beach House",
            price: 475000,
            bedrooms: 3,
            bathrooms: 2,
            location: "Miami Beach, FL",
            image: "https://example.com/image1.jpg",
          },
          {
            id: "MIAMI-002",
            name: "Luxury Condo",
            price: 490000,
            bedrooms: 2,
            bathrooms: 2,
            location: "Downtown Miami, FL",
            image: "https://example.com/image2.jpg",
          },
        ],
      };
    },
    
    filterByBudget: ({ budget }) => {
      console.log(`Filtering properties under $${budget}...`);
      
      return {
        filteredProperties: [
          {
            id: "MIAMI-002",
            name: "Luxury Condo",
            price: 490000,
            bedrooms: 2,
            bathrooms: 2,
            location: "Downtown Miami, FL",
          },
        ],
      };
    },
    
    viewPropertyDetails: ({ propertyId }) => {
      console.log(`Fetching details for property ID: ${propertyId}...`);
      
      return {
        propertyDetails: {
          id: propertyId,
          name: "Modern Beach House",
          price: 475000,
          bedrooms: 3,
          bathrooms: 2,
          description: "A stunning beachfront house with an open floor plan and ocean views.",
          location: "Miami Beach, FL",
          image: "https://example.com/image1.jpg",
        },
      };
    },
  },
};

export default propertyGuide;

