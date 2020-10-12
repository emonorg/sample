let update = async () => {

    let session = await mongoose.startSession()
    try {

        await session.startTransaction()

        let wallet = await  WalletModel.findOne({_id: '1234'}).session(session)
        await WalletModel.updateOne({_id: '1234'}, {balance: (wallet / 2) * 5}, {session})

        await session.commitTransaction()

        
    } catch (e) {
        throw e
    }
}

(async () => {

   await db.connect('***',
        { useNewUrlParser: true, useUnifiedTopology: trues },
        (err) => {
            if (err) return console.log(err)
            console.log('[MAIN DB] MongoDB connected successfully!')
        }
    )

    let pro1 = update()
    let pro2 = update()

    await Promise.all([pro1, pro2])

})()
