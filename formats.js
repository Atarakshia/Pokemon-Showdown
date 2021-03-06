exports.BattleFormats = {

	// formats

	randombattle: {
		effectType: 'Format',
		name: "Random Battle",
		team: 'random',
		searchDefault: true,
		rated: true,
		challengeShow: true,
		searchShow: true,
		ruleset: ['PotD', 'Pokemon', 'SleepClause']
	},
	unratedrandombattle: {
		effectType: 'Format',
		name: "Unrated Random Battle",
		team: 'random',
		searchShow: true,
		ruleset: ['PotD', 'Pokemon', 'SleepClause']
	},
	ou: {
		effectType: 'Format',
		name: "OU",
		challengeDefault: true,
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'SleepClause', 'SpeciesClause', 'Standard', 'TeamPreview'],
		banlist: ['Uber', 'Drizzle ++ SwiftSwim']
	},
	cap: {
		effectType: 'Format',
		name: "CAP",
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['CAPPokemon', 'SleepClause', 'SpeciesClause', 'Standard', 'TeamPreview'],
		banlist: ['Uber', 'Drizzle ++ SwiftSwim']
	},
	capnecturnaplaytest: {
		effectType: 'Format',
		name: "CAP Necturna Playtest",
		rated: true,
		ruleset: ['CAPPokemon', 'SleepClause', 'SpeciesClause', 'Standard', 'TeamPreview'],
		banlist: ['Uber','G4CAP','Tomohawk','ShadowStrike','PaleoWave']
	},
	ubers: {
		effectType: 'Format',
		name: "Ubers",
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'SleepClause', 'SpeciesClause', 'Standard', 'TeamPreview'],
		banlist: []
	},
	uu: {
		effectType: 'Format',
		name: "UU",
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'SleepClause', 'SpeciesClause', 'Standard', 'TeamPreview'],
		banlist: ['Uber','OU','BL', 'SnowWarning','Drought']
	},
	ru: {
		effectType: 'Format',
		name: "RU",
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'SleepClause', 'SpeciesClause', 'Standard', 'TeamPreview'],
		banlist: ['Uber','OU','BL','UU','BL2', 'SnowWarning','Drought', 'ShellSmash + BatonPass']
	},
	nu: {
		effectType: 'Format',
		name: "NU",
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon', 'SleepClause', 'SpeciesClause', 'Standard', 'TeamPreview'],
		banlist: ['Uber','OU','BL','UU','BL2','RU','BL3', 'SnowWarning','Drought', 'ShellSmash + BatonPass']
	},
	hackmons: {
		effectType: 'Format',
		name: "Hackmons",
		rated: true,
		challengeShow: true,
		searchShow: true,
		isTeambuilderFormat: true,
		ruleset: ['Pokemon'],
		banlist: []
	},
	balancedhackmons: {
		effectType: 'Format',
		name: "Balanced Hackmons",
		rated: true,
		challengeShow: true,
		searchShow: true,
		teambuilderFormat: 'Hackmons',
		ruleset: ['Pokemon'],
		banlist: ['OHKO', 'WonderGuard']
	},
	haxmons: {
		effectType: 'Format',
		name: "Haxmons",
		ruleset: ['HaxClause', 'TeamPreview']
	},
	debugmode: {
		effectType: 'Format',
		name: "Debug Mode",
		challengeShow: true,
		canUseRandomTeam: true,
		// no restrictions, for serious
		ruleset: []
	},

	// rules

	standard: {
		effectType: 'Banlist',
		banlist: ['Unreleased', 'Illegal', 'OHKO', 'Moody', 'BrightPowder', 'LaxIncense', 'Minimize', 'DoubleTeam', 'Legal'],
		validateSet: function(set) {
			// limit one of each move in Standard
			var moves = [];
			if (set.moves) {
				var hasMove = {};
				for (var i=0; i<set.moves.length; i++) {
					var move = this.getMove(set.moves[i]);
					var moveid = move.id;
					if (hasMove[moveid]) continue;
					hasMove[moveid] = true;
					moves.push(set.moves[i]);
				}
			}
			set.moves = moves;
		}
	},
	pokemon: {
		effectType: 'Banlist',
		validateSet: function(set, format) {
			var item = this.getItem(set.item);
			var template = this.getTemplate(set.species);
			var problems = [];

			if (set.species === set.name) delete set.name;
			if (template.num == 493) { // Arceus
				if (set.ability === 'Multitype' && item.onPlate) {
					set.species = 'Arceus-'+item.onPlate;
				} else {
					set.species = 'Arceus';
				}
			}
			if (template.num == 487) { // Giratina
				if (item.id === 'GriseousOrb') {
					set.species = 'Giratina-O';
				} else {
					set.species = 'Giratina';
				}
			}
			if (template.num == 555) { // Darmanitan
				set.species = 'Darmanitan';
			}
			if (template.num == 648) { // Meloetta
				set.species = 'Meloetta';
			}
			if (template.num == 351) { // Castform
				set.species = 'Castform';
			}
			if (template.num == 421) { // Cherrim
				set.species = 'Cherrim';
			}
			if (template.isNonstandard) {
				problems.push(set.species+' is not a real pokemon.');
			}
			if (set.moves) for (var i=0; i<set.moves.length; i++) {
				var move = this.getMove(set.moves[i]);
				if (move.isNonstandard) {
					problems.push(move.name+' is not a real move.');
				}
			}
			if (set.moves && set.moves.length > 4) {
				problems.push((set.name||set.species) + ' has more than four moves.');
			}
			return problems;
		}
	},
	cappokemon: {
		effectType: 'Rule',
		validateSet: function(set, format) {
			// don't return
			this.getEffect('Pokemon').validateSet.call(this, set, format);
		}
	},
	legal: {
		effectType: 'Banlist',
		banlist: ['Crobat+BraveBird+Hypnosis']
	},
	potd: {
		effectType: 'Rule',
		onPotD: '',
		onStart: function() {
			if (this.effect.onPotD) {
				this.add('rule', 'Pokemon of the Day: '+this.effect.onPotD);
			}
		}
	},
	teampreview: {
		onStartPriority: -10,
		onStart: function() {
			this.add('clearpoke');
			for (var i=0; i<this.sides[0].pokemon.length; i++) {
				this.add('poke', this.sides[0].pokemon[i].side.id, this.sides[0].pokemon[i].details);
			}
			for (var i=0; i<this.sides[1].pokemon.length; i++) {
				this.add('poke', this.sides[1].pokemon[i].side.id, this.sides[1].pokemon[i].details);
			}
		},
		onTeamPreview: function() {
			this.callback('team-preview');
		}
	},
	haxclause: {
		effectType: 'Rule',
		onStart: function() {
			this.add('rule', 'Hax Clause');
		},
		onModifyMovePriority: -100,
		onModifyMove: function(move) {
			if (move.secondary) {
				move.secondary.chance = 100;
			}
			if (move.accuracy !== true && move.accuracy <= 99) {
				move.accuracy = 0;
			}
			move.willCrit = true;
		}
	},
	speciesclause: {
		effectType: 'Rule',
		onStart: function() {
			this.add('rule', 'Species Clause');
		},
		validateTeam: function(team, format) {
			var speciesTable = {};
			for (var i=0; i<team.length; i++) {
				var template = this.getTemplate(team[i].species);
				if (speciesTable[template.num]) {
					return [template.name+" is banned by Species Clause."];
				}
				speciesTable[template.num] = true;
			}
		}
	},
	sleepclause: {
		effectType: 'Rule',
		onStart: function() {
			this.add('rule', 'Sleep Clause');
		},
		onSetStatus: function(status, target, source) {
			if (source && source.side === target.side) {
				return;
			}
			if (status.id === 'slp') {
				for (var i=0; i<target.side.pokemon.length; i++) {
					var pokemon = target.side.pokemon[i];
					if (pokemon.status === 'slp') {
						if (!pokemon.statusData.source ||
							pokemon.statusData.source.side !== pokemon.side) {
							this.add('message', 'Sleep Clause activated.');
							return false;
						}
					}
				}
			}
		}
	},
	freezeclause: {
		effectType: 'Rule',
		onStart: function() {
			this.add('rule', 'Freeze Clause');
		}
	}
};
