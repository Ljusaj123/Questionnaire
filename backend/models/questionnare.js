const mongoose = require("mongoose");

const QuestionTypeEnum = [
  'short-text',
  'long-text',
  'drop-down',
  'radio',
  'check-boxes',
  'date',
  'document',
  ''
];

const ConditionTargetTypeEnum = ['Section', 'Question', null];

const AnswerOptionSchema = new mongoose.Schema(
  {
    label: { type: String },
    isFlag: { type: Boolean, default: false },
    points: { type: Number }
  },
  { _id: false }
);

const ConditionSchema = new mongoose.Schema(
  {
    answerId: { type: String },
    type: {
      type: String,
      enum: ConditionTargetTypeEnum,
      default: null
    },
    target: { type: String }
  },
  { _id: false }
);

const QuestionSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  label: { type: String, required: true },
  type: {
    type: String,
    enum: QuestionTypeEnum,
    required: true
  },
  conditions: {
    type: [ConditionSchema],
    default: []
  },
  answers: {
    type: [AnswerOptionSchema],
    default: []
  }
});

const SectionSchema = new mongoose.Schema(
  {
    sectionId: { type: String, required: true },
    label: { type: String, required: true },
    questions: {
      type: [QuestionSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Section', SectionSchema);
