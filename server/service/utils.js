const {beginner, preIntermediate, intermediate, upperIntermediate, advanced} = require('../features/users/dto/levelsDto.js');

class ServerUtils {

    levelUp(level, earnedExp) {
        if(level == 'Beginner') {
            if(earnedExp >= 500) {
                return preIntermediate(earnedExp);
            } else {
                return beginner(earnedExp);
            }
        } else if (level == 'Pre-Intermediate') {
            if(earnedExp >= 1200) {
                return intermediate(earnedExp);
            } else {
                return preIntermediate(earnedExp);
            }
        } else if (level == 'Intermediate') {
            if(earnedExp >= 2500) {
                return upperIntermediate(earnedExp);
            } else {
                return intermediate(earnedExp);
            }
        } else if (level == 'Upper-Intermediate') {
            if(earnedExp >= 5000) {
                return advanced(earnedExp);
            } else {
                return upperIntermediate(earnedExp);
            }
        } else if (level == 'Advanced') {
            return advanced(earnedExp);
        }
    }

    computeExpAndBonusByLevel(level) {
        if(level == 'Beginner') {
            return {
                'bonusesPercent': 7,
                'bonusesRatio': 0.039,
                'expPercent': 5,
                'expRatio': 0.0039
            }
        } else if (level == 'Pre-Intermediate') {
            return {
                'bonusesPercent': 7.5,
                'bonusesRatio': 0.039,
                'expPercent': 6,
                'expRatio': 0.0039
            }
        } else if (level == 'Intermediate') {
            return {
                'bonusesPercent': 8,
                'bonusesRatio': 0.039,
                'expPercent': 6.5,
                'expRatio': 0.0039
            }
        } else if (level == 'Upper-Intermediate') {
            return {
                'bonusesPercent': 8.5,
                'bonusesRatio': 0.039,
                'expPercent': 7,
                'expRatio': 0.0039
            }
        } else if (level == 'Advanced') {
            return {
                'bonusesPercent': 9.5,
                'bonusesRatio': 0.039,
                'expPercent': 8,
                'expRatio': 0.0039
            }
        }
    }

}

module.exports = new ServerUtils();