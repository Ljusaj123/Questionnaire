
const Section = require("../models/questionnare.js");
const HttpError = require("../standard/http-error.js");

class QuestionnareRepository {
  static async getSections() {
    try {
      const sections  = await Section.find({});
      return sections;

    } catch (error) {
      const statusCode = error.statusCode || 500;
      throw new HttpError(statusCode, error.message || "An error occurred.");

    }
  }

  static async getQuestion(id) {
    try {
      const question = await User.findOne({  }, { _id: 0 });
      if (!user) throw new Error("User not found");

      await User.updateOne({ username }, { $set: { settings } });
    } catch (error) {
      const statusCode = error.statusCode || 500;
      throw new HttpError(statusCode, error.message || "An error occurred.");

    }
  }
  static async createQuestion(question) {
  	try {
  	  const user = await User.findOne({ username }, { _id: 0 });
      if (!user) throw new Error("User not found");

      await User.updateOne({ username }, { $set: { tutorialCompleted: true } });
  		
  	} catch(error) {
      const statusCode = error.statusCode || 500;
      throw new HttpError(statusCode, error.message || "An error occurred.");
      
    }
  }

  static async updateQuestion(question) {
  	try {
  	  const user = await User.findOne({ username }, { _id: 0 });
      if (!user) throw new Error("User not found");

      await User.updateOne({ username }, { $set: { tutorialCompleted: true } });
  		
  	} catch(error) {
      const statusCode = error.statusCode || 500;
      throw new HttpError(statusCode, error.message || "An error occurred.");
      
    }
  }

  static async deleteQuestion(id) {
  	try {
  	  const user = await User.findOne({ username }, { _id: 0 });
      if (!user) throw new Error("User not found");

      await User.updateOne({ username }, { $set: { tutorialCompleted: true } });
  		
  	} catch(error) {
      const statusCode = error.statusCode || 500;
      throw new HttpError(statusCode, error.message || "An error occurred.");
      
    }
  }

  static async createSection(section) {
  	try {
  	  const user = await User.findOne({ username }, { _id: 0 });
      if (!user) throw new Error("User not found");

      await User.updateOne({ username }, { $set: { tutorialCompleted: true } });
  		
  	} catch(error) {
      const statusCode = error.statusCode || 500;
      throw new HttpError(statusCode, error.message || "An error occurred.");
      
    }
  }

  static async deleteSection(id) {
  	try {
  	  const user = await User.findOne({ username }, { _id: 0 });
      if (!user) throw new Error("User not found");

      await User.updateOne({ username }, { $set: { tutorialCompleted: true } });
  		
  	} catch(error) {
      const statusCode = error.statusCode || 500;
      throw new HttpError(statusCode, error.message || "An error occurred.");
      
    }
  }
}

module.exports = QuestionnareRepository;
