const Section = require("../models/questionnare.js");
const HttpError = require("../standard/http-error.js");

class QuestionnareRepository {
	static async getSections() {
		try {
			const sections = await Section.find({});
			return sections;
		} catch (error) {
			const statusCode = error.statusCode || 500;
			throw new HttpError(statusCode, error.message || "An error occurred.");
		}
	}
	
	static async createQuestion(question, sectionId) {
		try {
			const section = await Section.findOne({ sectionId });
			if (!section) throw new Error("User not found");

			section.questions.push(question);

			await section.save();
		} catch (error) {
			const statusCode = error.statusCode || 500;
			throw new HttpError(statusCode, error.message || "An error occurred.");
		}
	}

	static async deleteQuestion(sectionId, questionId) {
		try {
			await Section.updateOne({ sectionId: sectionId }, { $pull: { questions: { questionId: questionId } } });
		} catch (error) {
			const statusCode = error.statusCode || 500;
			throw new HttpError(statusCode, error.message || "An error occurred.");
		}
	}

	static async createSection(section) {
		try {
			await Section.create(section);
		} catch (error) {
			const statusCode = error.statusCode || 500;
			throw new HttpError(statusCode, error.message || "An error occurred.");
		}
	}

	static async deleteSection(id) {
		try {
			await Section.deleteOne({ sectionId: id });
		} catch (error) {
			const statusCode = error.statusCode || 500;
			throw new HttpError(statusCode, error.message || "An error occurred.");
		}
	}
}

module.exports = QuestionnareRepository;
