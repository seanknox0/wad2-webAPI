import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const PersonSchema = new Schema({
    profile_path: {type: String},
    adult: {type: Boolean},
    id: {type: Number, required: true, unique: true},
    known_for: [
      {
        poster_path: {type: String},
        adult: {type: Boolean},
        overview: {type: String},
        release_date: {type: String},
        original_title: {type: String},
        genre_ids: [{ type: Number }],
        id: {type: Number, required: true, unique: true},
        media_type: {type: String},
        original_language: {type: String},
        title: {type: String},
        backdrop_path: {type: String},
        popularity: {type: Number},
        vote_count: {type: Number},
        video: {type: Number},
        vote_average: {type: Number}
      }
    ],
    name: {type: String},
    popularity: {type: Number}
  });

PersonSchema.statics.findByMovieDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('Person', PersonSchema);