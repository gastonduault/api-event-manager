import axios from "axios";
export class SessionService {
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
      throw new Error(
        "Error creating session in Campaign Keeper: " + error.message,
      );
    }
  }
}
