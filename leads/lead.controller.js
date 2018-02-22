function readAll(req, res) {
    const role = req.auth.userRole

    let id = ""
    if (role === 'Provider') {
        id = req.auth.providerId
    }
    else if (role === 'User') {
        id = req.auth.userId
    }

    const queryInfo = {
        role: role,
        id: id
    }

    leadsService.readAll(queryInfo)
        .then(leads => {
            res.json(new responses.ItemsResponse(leads))
        })
        .catch(err => {
            res.status(500).send(new responses.ErrorResponse(err))
        })
}