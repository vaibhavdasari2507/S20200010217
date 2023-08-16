const axios = require('axios')
exports.gettrains = async (req, res) => {
    try {
        const resp = await axios.post('http://20.244.56.144/train/auth',{
        "companyName":"xyz",
        "ownerName":"Vaibhav Dasari",
        "rollNo":"S20200010217",
        "ownerEmail":"vaibhav.d20@iiits.in",
        "accessCode":"jYjgQH",
        "clientID":"c07748a8-b644-4d10-abc2-c9a33d912690",
        "clientSecret":"lkJVNJMKZFKWgrzD"
        })

        const trains = await axios.get('http://20.244.56.144/train/trains',{
            headers:{
                'Authorization':'Bearer '+resp.data.access_token
            }
        })
        const info = trains.data;

        info.sort((t1, t2) => {
            const t1tickets = t1.seatsAvailable.sleeper + t1.seatsAvailable.AC;
            const t2tickets = t2.seatsAvailable.sleeper + t2.seatsAvailable.AC;

            if (t1.price.sleeper + t1.price.AC !== t2.price.sleeper + t2.price.AC) 
                return t1.price.sleeper + t1.price.AC - t2.price.sleeper - t2.price.AC
            if (t1tickets !== t2tickets) 
                return t2tickets - t1tickets;
            
            const t1delay = (t1.deptime.Hours * 3600 + t1.deptime.Minutes * 60 + t1.deptime.Seconds) + (t1.delayedBy * 60);
            const t2delay = (t2.deptime.Hours * 3600 + t2.deptime.Minutes * 60 + t2.deptime.Seconds) + (t2.delayedBy * 60);
        
            return t2delay - t1delay;
        });

        res.status(200).json({success:true,data:info})

    } catch (error) {
        res.status(500).error({success:false,error:error.message})
    }
}