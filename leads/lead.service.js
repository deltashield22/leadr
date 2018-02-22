function readAll(queryInfo) {
    let query = {}

    if (queryInfo.role === 'Provider') {
        query = { "providerId": new ObjectId(queryInfo.id) }
    } else if (queryInfo.role === 'User') {
        query = { "userId": new ObjectId(queryInfo.id) }
    }

    return conn.db().collection('leads').find(query)
        .map(lead => {
            lead._id = lead._id.toString()
            lead.userId = lead.userId.toString()
            lead.providerId = lead.providerId.toString()
            lead.serviceId = lead.serviceId.toString()
            return lead
        }).toArray()
}