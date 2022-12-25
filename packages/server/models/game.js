const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 72,
    default: 'Untitled',
  },
  description: {
    type: String,
    maxLength: 256,
  },
  difficulty: {
    type: Schema.Types.Decimal128,
    validate: {
      validator: (v) => {
        if (v >= 0 && v <= 5) {
          return true;
        }
        return false;
      },
      message: (props) => `${props.value} is not between 0 and 5`,
    },
    required: true,
    default: 0,
  },
  html: {
    type: String,
    required: true,
  },
  validator: {
    type: String,
    required: true,
  },
  props: {
    type: Schema.Types.Mixed,
    required: true,
  },
  css: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  helper_text: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Game', GameSchema);
