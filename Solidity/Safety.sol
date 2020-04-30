pragma solidity >=0.5.0 <0.6.0;

contract Safety {

    struct Infraction {
        uint16 limit;
        uint16 speed;
        uint datetime;
        uint32 latitude;
        uint32 longitude;
    }

    event NewInfraction(uint id, uint datetime);

    Infraction[] public infractions;

    uint public userCount = 0;
    mapping(uint => address) public userAddrs;
    mapping(address => uint) public userInfractionCount;
    mapping(uint => address) public infractionToUser;

    function logInfraction(uint16 _limit, uint16 _speed, uint _datetime, uint32 _lat, uint32 _lon) public {
        uint id = infractions.push(Infraction({limit: _limit, speed: _speed, datetime: _datetime, latitude: _lat, longitude: _lon})) - 1;
        infractionToUser[id] = msg.sender;
        if(userInfractionCount[msg.sender] == 0) {
          userAddrs[userCount] = msg.sender;
          userCount = userCount + 1;
        }
        userInfractionCount[msg.sender] = userInfractionCount[msg.sender] + 1;
        emit NewInfraction(id,_datetime);
    }
}
