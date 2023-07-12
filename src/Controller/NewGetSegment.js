const Segment = require('../Models/NewGetSegment');
exports.findBySearch = async (req, res) => {
    const bodyKeys = Object.keys(req.body);
    var users = '';
    try {
        if(bodyKeys[0] == 'First_Name'){
            const { First_Name } = req.body;
            users = await Segment.searchUsersByFirstName(First_Name);
        } else if(bodyKeys[0] == 'email'){ console.log('testt');
            const { email } = req.body;
            console.log('payload', email);
            users = await Segment.searchUsersByEmail(email);
        } else if(bodyKeys[0] == 'Last_name'){
            const { Last_name } = req.body;
            users = await Segment.searchUsersByLastName(Last_name);
        }
        res.json({ users });
    } catch (error) {
      console.error('Error searching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };