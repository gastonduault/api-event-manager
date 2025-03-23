import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const CAMPAIGN_KEEPER_URL = process.env.CAMPAIGN_KEEPER_URL;

export class CampaignKeeperService {
  static async getCampaignById(campaignId) {
    try {
      const response = await axios.get(
        `${CAMPAIGN_KEEPER_URL}/api/campaigns/${campaignId}`,
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || "Unknown error from Campaign Keeper";

        throw new Error(errorMessage);
      }
      throw new Error(
        "Error getting campaign from Campaign Keeper: " + error.message,
      );
    }
  }
  static async createSession(campaignId, apiUrl) {
    try {
      const sessionData = {
        campaignId,
        apiUrl,
      };

      const response = await axios.post(
        `${CAMPAIGN_KEEPER_URL}/api/sessions`,
        sessionData,
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || "Unknown error from Campaign Keeper";

        throw new Error(errorMessage);
      }
      throw new Error(
        "Error creating session in Campaign Keeper: " + error.message,
      );
    }
  }
}
