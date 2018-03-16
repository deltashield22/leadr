// Create an unconfirmed account with supplied user name/password
// Send confirmation email to supplied email address
// If account already exists return an error
function _register(req, res) {
    // Determine if user already exists
    userService.register(req.model)
        .then(newUser => {
            if (newUser !== null) {
                res.status(400).send(new responses.ErrorResponse("User already exists"))

            } else {

                /* 
                    Add needed internal fields
                */
                // Create email key with an expiration timer 
                req.model.emailKey = crypto.randomBytes(Math.ceil(32 / 2)).toString("hex").slice(0, 32);
                req.model.isEmailConfirmed = false;
                let _updateDate = req.model.updateDate
                const _deadline = _updateDate.setHours(_updateDate.getHours() + 24);
                req.model.emailKeyExpireDate = new Date(_deadline).toISOString();

                // Swap password for salt and hash
                req.model.password_salt = _generateSalt()
                req.model.password_hash = _createHashOfPassword(req.model.password_salt, req.model.password)
                delete req.model.password

                // Default to user role
                req.model.role = "User"

                userService.create(req.model)
                    .then(user => {
                        mailService.sendRegistrationConfirmationEmail(req.model)
                            .then(() => {
                                const responseModel = new responses.ItemResponse()
                                responseModel.item = user
                                res.status(200).json(responseModel)
                            })
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}