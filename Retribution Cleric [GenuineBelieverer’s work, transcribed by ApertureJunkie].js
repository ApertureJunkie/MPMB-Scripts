/*	-WHAT IS THIS?-
	This file adds optional material to 'MPMB's Character Record Sheet' found at https://flapkan.com/mpmb/charsheets
	Import this file using the 'Add Extra Materials' bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass
	Effect:		This script adds a cleric subclass called the “Retribution Cleric”

				This class has been made by /u/GenuineBelieverer on the subbreddit /r/UnearthedArcana
				This code is based on the July 2017 version of /u/GenuineBelieverer’s work

	Code by:	ApertureJunkie
	Date:		2017-07-21 (sheet v12.995)
*/

var iFileName = 'Retribution Cleric [GenuineBelieverer’s work, transcribed by ApertureJunkie].js';
RequiredSheetVersion(12.999);

SourceList['WHK:CSM'] = {
	name : 'WHK: The Compendium of Sacred Mysteries',
	abbreviation : 'WHK:CSM',
	group : 'Reddit/r/UnearthedArcana',
	url : 'www.reddit.com/user/GenuineBelieverer/',
	date : '2017/07/01'
};

var attackAdd = function()
{
   if (classes.known.cleric && classes.known.cleric.level > 7 && !isSpell) 
    {
        fields.Description += 'Once per turn +' + (classes.known.cleric.level < 14 ? 1 : 2) + 'd8 necrotic/radiant damage'; 
    }
};

ClassSubList['retribution domain'] = 
{
        regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*\b(retribution)\b).*$/i,
        subname : 'Retribution Domain',
        source : ['WHK:TCSM', 16],
        spellcastingExtra : ['compelled duel', 'hellish rebuke', 'enlarge/reduce', 'spiritual weapon', 'fear', 'spirit guardians', 'fire shield', 'locate creature', 'bigby’s hand', 'flame strike'],
        features : {
            'subclassfeature1' : {
                name : 'Bonus Proficiency',
                source : ['WHK:CSM', 16],
                minlevel : 1,
                description : '\n   ' + 'I gain proficiency with martial weapons and heavy armor',
                armor : [false, false, true, false],
                weapons : [false, true],
            },
            'subclassfeature1.1' : {
                name : 'Vengeful Counter',
                source : ['WHK:CSM', 16],
                minlevel : 1,
                description : '\n   ' + 'When an ally I can see takes damage from an enemy in my reach I can make a melee attack against the attacker as a reaction',
                action : ['reaction', '']
            },
            'subclassfeature2' : {
                name : 'Channel Divinity: Enable Revenge',
                source : ['WHK:CSM', 16],
                minlevel : 2,
                description : '\n   ' + 'As a reaction, when an ally I can see takes damage, I give my ally adv. on rolls to track their attacker for 1 hour. They are aware of the attacker’s location within 100 ft. If ally sees attacker make an attack or cast a spell ally can move up to their speed towards attacker',
                action : ['reaction', '']
            },
            'subclassfeature6' : {
                name : 'Fly Havoc',
                source : ['WHK:CSM', 16],
                minlevel : 6,
                description : '\n   ' + 'As a bonus action I can expend a spell slot of 3rd level or higher to cause wings to sprout from my back, transforming my armor to suit them. I gain a flying speed equal to my walking speed. When I am on the ground while these wings are deployed and don\'t have a shield equipped, I gain a bonus to my AC equal to half my Wisdom modifier (rounded down). These wings last for a number of rounds equal to the level of the spell slot expended plus one',
                action : ['bonus action', '']
            },
            'subclassfeature8' : {
                name : 'Divine Strike',
                source : ['WHK:CSM', 16],
                minlevel : 8,
                description : '\n   ' + 'Once per turn, when I hit a creature with a weapon attack, I can do extra damage',
                additional : levels.map(function (n) {
                    if (n < 8) return '';
                    return '+' + (n < 14 ? 1 : 2) + 'd8 necrotic/radiant damage';
                }),
                calcChanges : {
                    atkAdd : [attackAdd, 'Once per turn, I can have one of my weapon attacks that hit do extra damage.']
                }
            },
            'subclassfeature17' : {
                name : 'No Rest for the Wicked',
                source : ['WHK:CSM', 16],
                minlevel : 17,
                description : '\n   ' + 'I gain immunity to exhaustion and frightened conditions. My reach is increased by 5 ft. for Vengeful Counter. I add my Divine Strike damage to damage dealt by Vengeful Counter even though it is not my turn.',
                save: 'Immune to exhaustion and frightened'
            }
        }
    };


ClassList.cleric.subclasses[1].push("retribution domain");