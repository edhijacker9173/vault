window.ATLAS_CATEGORIES = [
  { id: "crusade", label: "Crusades", color: "#c58b3a" },
  { id: "order", label: "Templar Order", color: "#d7c7a1" },
  { id: "battle", label: "Battles & Sieges", color: "#d54545" },
  { id: "finance", label: "Power & Finance", color: "#4fb5a8" },
  { id: "fall", label: "Fall", color: "#9d5cff" },
  { id: "legend", label: "Legends", color: "#76a9ff" }
];

window.ATLAS_LOCATIONS = [
  { id: "clermont", name: "Clermont", region: "France", x: 19, y: 36, lat: 45.78, lng: 3.08 },
  { id: "paris", name: "Paris", region: "France", x: 21, y: 30, lat: 48.86, lng: 2.35 },
  { id: "troyes", name: "Troyes", region: "France", x: 23, y: 34, lat: 48.30, lng: 4.07 },
  { id: "la-rochelle", name: "La Rochelle", region: "Atlantic France", x: 14, y: 44, lat: 46.16, lng: -1.15 },
  { id: "europe", name: "European commanderies", region: "Western Europe", x: 28, y: 42, lat: 47.00, lng: 8.00 },
  { id: "civetot", name: "Civetot", region: "Anatolia", x: 63, y: 47, lat: 40.74, lng: 29.83 },
  { id: "nicaea", name: "Nicaea", region: "Anatolia", x: 62, y: 49, lat: 40.43, lng: 29.72 },
  { id: "dorylaeum", name: "Dorylaeum", region: "Anatolia", x: 66, y: 50, lat: 39.78, lng: 30.52 },
  { id: "constantinople", name: "Constantinople", region: "Byzantium", x: 59, y: 45, lat: 41.01, lng: 28.98 },
  { id: "antioch", name: "Antioch", region: "Syria", x: 75, y: 62, lat: 36.20, lng: 36.16 },
  { id: "acre", name: "Acre", region: "Levant coast", x: 77, y: 68, lat: 32.92, lng: 35.08 },
  { id: "hattin", name: "Hattin", region: "Galilee", x: 79, y: 70, lat: 32.82, lng: 35.45 },
  { id: "arsuf", name: "Arsuf", region: "Levant coast", x: 78, y: 73, lat: 32.20, lng: 34.82 },
  { id: "jerusalem", name: "Jerusalem", region: "Holy Land", x: 80, y: 75, lat: 31.78, lng: 35.23 },
  { id: "ascalon", name: "Ascalon", region: "Holy Land", x: 78, y: 77, lat: 31.67, lng: 34.57 },
  { id: "damascus", name: "Damascus", region: "Syria", x: 82, y: 65, lat: 33.51, lng: 36.29 },
  { id: "damietta", name: "Damietta", region: "Egypt", x: 72, y: 84, lat: 31.42, lng: 31.81 },
  { id: "cyprus", name: "Cyprus", region: "Eastern Mediterranean", x: 74, y: 71, lat: 35.13, lng: 33.43 },
  { id: "rosslyn", name: "Rosslyn Chapel", region: "Scotland", x: 16, y: 17, lat: 55.86, lng: -3.16 }
];

window.ATLAS_EVENTS = [
  {
    id: "clermont-call",
    year: 1095,
    displayYear: "1095",
    title: "Urban II calls the First Crusade",
    category: "crusade",
    locationIds: ["clermont"],
    summary:
      "Pope Urban II calls western Christians to aid eastern Christians and reclaim Jerusalem, setting the First Crusade in motion.",
    significance:
      "This creates the ideological and military setting from which the crusader states, and later the Templars, emerge.",
    source: "Briefing section 2"
  },
  {
    id: "civetot",
    year: 1096,
    displayYear: "1096",
    title: "People's Crusade destroyed at Civetot",
    category: "battle",
    locationIds: ["civetot"],
    summary:
      "An undisciplined and poorly prepared crusading force is destroyed by Seljuk Turkish forces in Anatolia.",
    significance:
      "The disaster contrasts with the better-organized noble armies that follow and shows the danger of crusading without logistics or command.",
    source: "Briefing section 2"
  },
  {
    id: "nicaea",
    year: 1097,
    displayYear: "1097",
    title: "Crusaders capture Nicaea",
    category: "battle",
    locationIds: ["nicaea"],
    summary:
      "The professional armies of the First Crusade take Nicaea, an early strategic victory in Asia Minor.",
    significance:
      "The capture opens the route deeper into Anatolia and demonstrates the campaign's shift from chaos to disciplined military action.",
    source: "Briefing section 2"
  },
  {
    id: "dorylaeum",
    year: 1097,
    displayYear: "1097",
    title: "Battle of Dorylaeum",
    category: "battle",
    locationIds: ["dorylaeum"],
    summary:
      "Crusader cavalry and coordinated battlefield discipline repel a major Turkish attack.",
    significance:
      "The battle becomes an early example of the heavy cavalry and battlefield cohesion later associated with military orders.",
    source: "Briefing section 2"
  },
  {
    id: "antioch-siege",
    year: 1098,
    displayYear: "1097-1098",
    title: "Siege of Antioch",
    category: "battle",
    locationIds: ["antioch"],
    summary:
      "Crusaders endure a brutal siege, seize Antioch, then survive being trapped inside by defeating a relieving army.",
    significance:
      "Antioch becomes a foundational crusader state and a vital base for later operations in the Levant.",
    source: "Briefing section 2"
  },
  {
    id: "jerusalem-1099",
    year: 1099,
    displayYear: "1099",
    title: "Siege and capture of Jerusalem",
    category: "battle",
    locationIds: ["jerusalem"],
    summary:
      "Crusader forces storm Jerusalem on July 15 after weeks of siege warfare; accounts describe mass violence after the city falls.",
    significance:
      "Christian control of Jerusalem creates the pilgrim route security problem that directly leads to the Templars' founding.",
    source: "Briefing section 2"
  },
  {
    id: "ascalon",
    year: 1099,
    displayYear: "1099",
    title: "Battle of Ascalon",
    category: "battle",
    locationIds: ["ascalon"],
    summary:
      "Crusaders defeat a Fatimid army soon after taking Jerusalem, securing their conquest in the short term.",
    significance:
      "The victory helps stabilize the new Latin states, but the region remains under constant pressure.",
    source: "Briefing section 2"
  },
  {
    id: "templars-founded",
    year: 1119,
    displayYear: "c. 1119",
    title: "Hugh de Payens forms the Templar brotherhood",
    category: "order",
    locationIds: ["jerusalem"],
    summary:
      "Hugh de Payens and companions form a brotherhood dedicated to protecting pilgrims in the Kingdom of Jerusalem.",
    significance:
      "The order institutionalizes the idea of a permanent religious military force serving a frontier and pilgrim-protection role.",
    source: "Briefing section 3"
  },
  {
    id: "temple-mount",
    year: 1120,
    displayYear: "early 1120s",
    title: "Quarters granted on the Temple Mount",
    category: "order",
    locationIds: ["jerusalem"],
    summary:
      "King Baldwin II grants the group quarters in a royal complex associated by crusaders with the ancient Temple of Solomon.",
    significance:
      "The location gives the Knights of the Temple their enduring name and a powerful symbolic identity.",
    source: "Briefing section 3"
  },
  {
    id: "council-troyes",
    year: 1129,
    displayYear: "1128-1129",
    title: "Council of Troyes recognizes the order",
    category: "order",
    locationIds: ["troyes"],
    summary:
      "The order receives formal ecclesiastical recognition, with Bernard of Clairvaux helping legitimize its religious mission.",
    significance:
      "Recognition allows recruitment, patronage, land gifts, and the rapid expansion of the Templar network across Europe.",
    source: "Briefing section 3"
  },
  {
    id: "papal-privilege",
    year: 1139,
    displayYear: "1139",
    title: "Papal privileges strengthen Templar independence",
    category: "finance",
    locationIds: ["europe"],
    summary:
      "Pope Innocent II grants privileges that exempt the Templars from many taxes and local controls, making them answerable to the papacy.",
    significance:
      "This autonomy lets the order move resources, recruit, and operate across multiple kingdoms with unusual independence.",
    source: "Briefing section 4"
  },
  {
    id: "damascus-1148",
    year: 1148,
    displayYear: "1148",
    title: "Second Crusade fails at Damascus",
    category: "battle",
    locationIds: ["damascus"],
    summary:
      "The Siege of Damascus collapses, exposing how fragile crusader strategy could be when leadership was divided.",
    significance:
      "The failure underscores the value of disciplined permanent orders in a crusading world often weakened by temporary coalitions.",
    source: "Briefing section 4"
  },
  {
    id: "finance-network",
    year: 1160,
    displayYear: "12th century",
    title: "Commanderies and financial houses mature",
    category: "finance",
    locationIds: ["europe", "acre", "jerusalem"],
    summary:
      "The Templars build an international network of estates, warehouses, ports, churches, castles, and financial houses.",
    significance:
      "Their wealth increasingly exists as land, rents, deposits, accounts, and credit systems rather than a single treasure hoard.",
    source: "Briefing sections 1 and 4"
  },
  {
    id: "hattin",
    year: 1187,
    displayYear: "1187",
    title: "Battle of Hattin and loss of Jerusalem",
    category: "battle",
    locationIds: ["hattin", "jerusalem"],
    summary:
      "Saladin's victory destroys much of the crusader field army; captured Templars are among those executed, and Jerusalem falls soon after.",
    significance:
      "The catastrophe triggers the Third Crusade and reveals the vulnerability of crusader power in the Levant.",
    source: "Briefing section 4"
  },
  {
    id: "acre-siege",
    year: 1191,
    displayYear: "1189-1191",
    title: "Siege of Acre restores a coastal foothold",
    category: "battle",
    locationIds: ["acre"],
    summary:
      "Crusading armies fight a long and grueling siege before Acre falls and the crusader foothold on the coast is restored.",
    significance:
      "The campaign shows the importance of maritime supply, fortified ports, and disciplined military orders.",
    source: "Briefing section 4"
  },
  {
    id: "arsuf",
    year: 1191,
    displayYear: "1191",
    title: "Richard I wins at Arsuf",
    category: "battle",
    locationIds: ["arsuf"],
    summary:
      "Richard I uses disciplined formations and a controlled cavalry charge to defeat Saladin's forces.",
    significance:
      "The victory demonstrates the battlefield endurance and tactical discipline that made military orders central to crusading warfare.",
    source: "Briefing section 4"
  },
  {
    id: "constantinople-1204",
    year: 1204,
    displayYear: "1204",
    title: "Fourth Crusade sacks Constantinople",
    category: "crusade",
    locationIds: ["constantinople"],
    summary:
      "The Fourth Crusade attacks Constantinople instead of the Holy Land, deepening the split between Latin and Greek Christians.",
    significance:
      "The episode marks a major strategic and moral fracture in the crusading movement.",
    source: "Briefing section 4"
  },
  {
    id: "damietta",
    year: 1221,
    displayYear: "13th century",
    title: "Egyptian crusading strategy falters",
    category: "crusade",
    locationIds: ["damietta"],
    summary:
      "Later crusades target Egypt with bold logic but poor execution, including failures tied to Damietta and the Nile delta.",
    significance:
      "These campaigns reveal recurring problems of logistics, climate, coordination, and leadership rivalry.",
    source: "Briefing sections 4 and Battles"
  },
  {
    id: "acre-falls",
    year: 1291,
    displayYear: "1291",
    title: "Fall of Acre ends the mainland crusader states",
    category: "fall",
    locationIds: ["acre", "cyprus"],
    summary:
      "Acre, the last major crusader stronghold in the Holy Land, falls; the Templars withdraw to Cyprus.",
    significance:
      "Without Jerusalem and the mainland frontier, the order's founding mission is deeply weakened.",
    source: "Briefing section 5"
  },
  {
    id: "arrests-1307",
    year: 1307,
    displayYear: "Friday, Oct. 13, 1307",
    title: "Philip IV orders mass arrests",
    category: "fall",
    locationIds: ["paris", "europe"],
    summary:
      "King Philip IV of France moves against the Templars with coordinated arrests and charges of heresy, blasphemy, and immoral rites.",
    significance:
      "The arrests combine royal debt, political pressure, coerced testimony, and the vulnerability of a wealthy transnational institution.",
    source: "Briefing sections 5 and 6"
  },
  {
    id: "la-rochelle-legend",
    year: 1307,
    displayYear: "1307 and after",
    title: "Escape and La Rochelle treasure legends",
    category: "legend",
    locationIds: ["la-rochelle"],
    summary:
      "Later legends claim Templar ships escaped from La Rochelle with treasure, archives, relics, or senior members.",
    significance:
      "The story grows from real uncertainty around uneven arrests, but the grand treasure claims remain unproven.",
    source: "Briefing section 6"
  },
  {
    id: "dissolution",
    year: 1312,
    displayYear: "1312",
    title: "Pope Clement V dissolves the order",
    category: "fall",
    locationIds: ["europe"],
    summary:
      "Under intense political pressure, Pope Clement V dissolves the Knights Templar.",
    significance:
      "The order's formal end shows how papal authority could be bent by royal power in late medieval Europe.",
    source: "Briefing section 5"
  },
  {
    id: "molay-executed",
    year: 1314,
    displayYear: "1314",
    title: "Jacques de Molay executed in Paris",
    category: "fall",
    locationIds: ["paris"],
    summary:
      "The last Grand Master retracts earlier confessions and is burned in Paris.",
    significance:
      "His death becomes the dramatic endpoint of the order's destruction and fuels the Templar afterlife in memory and myth.",
    source: "Briefing section 5"
  },
  {
    id: "myth-afterlife",
    year: 1314,
    displayYear: "After 1314",
    title: "Grail, Rosslyn, and hidden-relic myths expand",
    category: "legend",
    locationIds: ["rosslyn", "jerusalem"],
    summary:
      "Later writers link the Templars to the Holy Grail, Ark of the Covenant, Rosslyn Chapel, Temple Mount tunnels, and vanished wealth.",
    significance:
      "These claims are not established by firm evidence, but they shape the Templars' modern reputation for secrecy and treasure.",
    source: "Briefing section 6"
  }
];
