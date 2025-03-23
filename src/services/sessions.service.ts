import axios from "axios";
export class CampaignKeeperService {
  static async getCampaignById(campaignId) {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/campaigns/${campaignId}`,
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
        "http://localhost:5000/api/sessions",
        sessionData,
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        // Récupère le message d'erreur de Campaign Keeper
        const errorMessage =
          error.response.data.message || "Unknown error from Campaign Keeper";

        // Génère une erreur propre avec le message extrait
        throw new Error(errorMessage);
      }
      throw new Error(
        "Error creating session in Campaign Keeper: " + error.message,
      );
    }
  }
}
