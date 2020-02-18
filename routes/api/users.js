const express = require('express');
const router = express.Router();
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const User = require('../../models/User');

// Route for registering a user
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	// Checks if user already exists in database and saves if it's a new user
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			errors.email = 'User already exists';
			return res.status(400).json(errors);
		} else {
			const newUser = new User({
				email: req.body.email,
				password: req.body.password
			});

			// Salting and hashing user password before database storage
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => {
							const payload = { id: user.id, email: user.email };

							jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
								res.json({
									success: true,
									token: 'Bearer ' + token
								});
							});
						})
						.catch(err => console.log(err)); 
				});
			});
		}
	});
});

// Route for logging in a user
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'This user does not exist'
      return res.status(400).json(errors)
    }

		// Returns a signed web token with each login/register for use in frontend
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, email: user.email }

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          }
        )
      } else {
        errors.password = 'Incorrect password'
        return res.status(400).json(errors)
      }
    })
  })
})

// Route for getting the current user
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({
		id: req.user.id,
		email: req.user.email
		profile_image_url: req.user.profile_image_url 
	});
})

module.exports = router;