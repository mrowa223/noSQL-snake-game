import axios from 'axios'

export const record = async() =>{
    const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { records: { score: req.body.score, time: req.body.time } } },
        { new: true }
      );
      
      if (req.body.score > user.bestRecord.score) {
        // Update the user's bestRecord with the new score and time
        user.bestRecord = { score: req.body.score, time: req.body.time };
        // Set the user's rank to null so it will be recalculated on the next leaderboard update
        user.rank = null;
        await user.save();
      }
      
      // If the user's new score is equal to their bestRecord score, compare the times
      if (req.body.score === user.bestRecord.score && req.body.time < user.bestRecord.time) {
        // Update the user's bestRecord with the new time
        user.bestRecord.time = req.body.time;
        // Set the user's rank to null so it will be recalculated on the next leaderboard update
        user.rank = null;
        await user.save();
      }
      
      // Update the ranks and bestRecords in the user documents
      const users = await User.find();
      const sortedUsers = users.sort((a, b) => {
        if (a.bestRecord.score > b.bestRecord.score) return -1;
        if (a.bestRecord.score < b.bestRecord.score) return 1;
        if (a.bestRecord.score === b.bestRecord.score)
            {
            if (a.bestRecord.time < b.bestRecord.time) return -1;
            if (a.bestRecord.time > b.bestRecord.time) return 1;
        }
      return 0;
      });
      sortedUsers.forEach((user, index) => {
      // Update the user's rank and bestRecord in the user document
      user.rank = index + 1;
      user.bestRecord = sortedUsers[0].bestRecord.score === user.bestRecord.score ? user.bestRecord : null;
      user.save();
      });
      
      // Update the leaderboard collection in MongoDB with the rankedUsers array
      const rankedUsers = await User.find().sort({ rank: 1 });
      // Update the leaderboard collection in MongoDB with the rankedUsers array
    }