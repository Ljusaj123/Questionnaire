const mongoose = require("mongoose");

const QuestionTypeEnum = [
  'short-text',
  'long-text',
  'drop-down',
  'multiple',
  'check-boxes',
  'date',
  'document',
  ''
];

const ConditionTargetTypeEnum = ['section', 'question', null];

const AnswerOptionSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    isFlag: { type: Boolean, default: false },
    comment: { type: String },
    points: { type: Number }
  },
  { _id: false }
);

const ConditionSchema = new mongoose.Schema(
  {
    answerId: { type: String, required: true },
    type: {
      type: String,
      enum: ConditionTargetTypeEnum,
      default: null
    },
    target: { type: String, required: true }
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
  isEditing: { type: Boolean},
  conditions: {
    type: [ConditionSchema],
    default: []
  },
  answers: {
    type: [AnswerOptionSchema],
    required: true
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
