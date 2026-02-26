const QuestionnareRepository = require("../repository/questionnare.repository");
const RestResponse = require("../standard/rest-response");

const questionnareController = {
	getSections: async (req, res) => {
		try {
			const questionnare = await QuestionnareRepository.getSections();
			return res.status(200).json(new RestResponse("success", questionnare));
		} catch (error) {
			const statusCode = error.statusCode || 500;
			res.status(statusCode).json(new RestResponse("error", error.message));
		}
	},

	getQuestion: async (req, res) => {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json(new RestResponse("error", "Id not provided"));
		}
		try {
			const question = await QuestionnareRepository.getQuestion(id);
			return res.status(200).json(new RestResponse("success", question));
		} catch (error) {
			const statusCode = error.statusCode || 500;
			res.status(statusCode).json(new RestResponse("error", error.message));
		}
	},

	createQuestion: async (req, res) => {
		const { question } = req.body;

		if (!question) {
			return res.status(400).json(new RestResponse("error", "Question not provided"));
		}
		try {
			await QuestionnareRepository.createQuestion(question);
			return res.status(200).json(new RestResponse("success", "Question created successfully"));
		} catch (error) {
			const statusCode = error.statusCode || 500;
			res.status(statusCode).json(new RestResponse("error", error.message));
		}
	},

	updateQuestion: async (req, res) => {
		const { question } = req.body;

		if (!question) {
			return res.status(400).json(new RestResponse("error", "Question not provided"));
		}
		try {
			await QuestionnareRepository.updateQuestion(question);
			return res.status(200).json(new RestResponse("success", "Question updated successfully"));
		} catch (error) {
			const statusCode = error.statusCode || 500;
			res.status(statusCode).json(new RestResponse("error", error.message));
		}
	},

	deleteQuestion: async (req, res) => {
		const { id } = req.body;

		if (!id) {
			return res.status(400).json(new RestResponse("error", "Id not provided"));
		}
		try {
			await QuestionnareRepository.deleteQuestion(id);
			return res.status(200).json(new RestResponse("success", "Question deleted successfully"));
		} catch (error) {
			const statusCode = error.statusCode || 500;
			res.status(statusCode).json(new RestResponse("error", error.message));
		}
	},

	createSection: async (req, res) => {
		const { section } = req.body;

		if (!section) {
			return res.status(400).json(new RestResponse("error", "Section not provided"));
		}
		try {
			await QuestionnareRepository.createSection(section);
			return res.status(200).json(new RestResponse("success", "Section created successfully"));
		} catch (error) {
			const statusCode = error.statusCode || 500;
			res.status(statusCode).json(new RestResponse("error", error.message));
		}
	},

	deleteSection: async (req, res) => {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json(new RestResponse("error", "Id not provided"));
		}
		try {
			await QuestionnareRepository.deleteSection(id);
			return res.status(200).json(new RestResponse("success", "Section deleted successfully"));
		} catch (error) {
			const statusCode = error.statusCode || 500;
			res.status(statusCode).json(new RestResponse("error", error.message));
		}
	},
};

module.exports = questionnareController;
