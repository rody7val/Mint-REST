var Story = require('../models/story');

exports.getAll = function (req, res) {
	Story.find({'publishStatus': 1}, function (err, stories) {
		if (err) {
			res.send(err);
			return
		}
		res.json({stories: stories});
	});
}

exports.story = function (req, res) {
	Story.find({_id: req.param('id')}, function (err, story) {
		if (err) {
			res.send(err);
			return
		}
		res.json(story);
	});
}

exports.remove_story = function (req, res) {
	Story.remove({_id: req.param('id')}, function (err) {
		if (err) {
			res.send(err);
			return
		}
		res.json({message: "Successfuly removed", type: "success"});
	});
}

exports.search_story = function (req, res) {
	Story.find({$and: [{'content': new RegExp(req.param('query'), 'i')}, {'publishStatus': 1}]}, function (err, stories) {
		if (err) {
			res.send(err);
			return
		}
		res.json(stories);
	});
}

exports.search_story_by_category = function (req, res) {
	Story.find({$and: [{category: req.param('category')}, {'publishStatus': 1}]}, function (err, stories) {
		if (err) {
			res.send(err);
			return
		}
		res.json(stories);
	});
}

exports.new = function (req, res) {
	var story = new Story({
		owner: req.decoded._id,
		title: req.body.title,
		content: req.body.content,
		category: req.body.category,
		publishStatus: req.body.publishStatus
	});
	story.save(function (err) {
		if (err) {
			res.status(500).send(err);
			return
		}
		res.json({message: "New Story Created", type: "success", code: 200});
	});
}

exports.story_of_user = function (req, res) {
	Story.find({owner: req.decoded._id}, function (err, stories) {
		if (err) {
			res.send(err);
			return
		}
		res.json(stories);
	});
}

exports.update_story = function (req, res) {
	var story = {
		owner: req.decoded._id,
		title: req.body.title,
		content: req.body.content,
		category: req.body.category,
		publishStatus: req.body.publishStatus
	};
	console.log("Story : ", story);
	Story.findOneAndUpdate({'_id': req.body.storyId}, story, function (err) {
		if (err) {
			res.status(500).send(err);
			return
		}
		res.json({message: "Story updated successfully"});
	});
}