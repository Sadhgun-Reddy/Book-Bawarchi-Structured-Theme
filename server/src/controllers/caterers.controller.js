const Caterer = require('../models/Caterer');

exports.getAllCaterers = async (req, res) => {
  try {
    const caterers = await Caterer.find();
    res.json(caterers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching caterers', error: error.message });
  }
};

exports.getCatererById = async (req, res) => {
  try {
    const caterer = await Caterer.findById(req.params.id);
    if (!caterer) {
      return res.status(404).json({ message: 'Caterer not found' });
    }
    res.json(caterer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching caterer', error: error.message });
  }
};

exports.createCaterer = async (req, res) => {
  try {
    const newCaterer = new Caterer(req.body);
    const savedCaterer = await newCaterer.save();
    res.status(201).json(savedCaterer);
  } catch (error) {
    res.status(400).json({ message: 'Error creating caterer', error: error.message });
  }
};

exports.updateCaterer = async (req, res) => {
  try {
    const updatedCaterer = await Caterer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCaterer) {
      return res.status(404).json({ message: 'Caterer not found' });
    }
    res.json(updatedCaterer);
  } catch (error) {
    res.status(400).json({ message: 'Error updating caterer', error: error.message });
  }
};

exports.deleteCaterer = async (req, res) => {
  try {
    const deletedCaterer = await Caterer.findByIdAndDelete(req.params.id);
    if (!deletedCaterer) {
      return res.status(404).json({ message: 'Caterer not found' });
    }
    res.json({ message: 'Caterer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting caterer', error: error.message });
  }
};
