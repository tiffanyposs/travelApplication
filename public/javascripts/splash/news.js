var platupi = [
	{name: "Winston", image: "winston.png", about: "Winston “the Worrywart” Tripper is the classic sweetheart of the group who is always looking out for everyone’s best interest. He might not be the most daring person, but he will always make sure there is nothing wrong with your trip."},
	{name: "Agnar", image: "agnar.png", about: "Agnar “the Navigator” Tripper has always had a keen sense of direction. His first gift was a compass, and since then has always be inclined to find the best way of traveling."},
	{name: "Yemi", image: "yemi.png", about: "Yemi “the Trailblazer” Tripper likes to introduce the group to new things. Whether it’s eating cricket tacos, going cliff diving, or ...examples examples….goes where no platypus has gone before….. "},
	{name: "Guillermo", image: "guillermo.png", about: "Guillermo “the Lively” Tripper always knows how to turn a fun night into one that you won’t forget. Whether it is dancing all night, drinking a little more than you should have, or staying up until sunrise."},
	{name: "Chaz", image: "chaz.png", about: "Chaz “That Guy” Tripper is the classic one in the group that goes with the flow. He is neither pushy nor picky, but he trusts his instincts and steers the group away from questionable decisions."},
	{name: "Chloe", image: "chloe.png", about: "Chloe Tripper - je m'applle Chloe. If there is shopping to be had she will conquer all. She will find all the best deals and the best styles. Come with an extra suitcase, because you will definitely need it for the flight home. 'Deal hunter'? Finds the best prices on flights, etc. "},
	{name: "Danoyshka", image: "danoyshka.png", about: "Danoyshka “deal with it” Tripper, born of the snow and cold of Northern Russia, has little patience for people who do not appreciate the wonders of travel. She has a strict zero tolerance policy for complainers."},
	{name: "Earl", image: "earl.png", about: "Earl “the Herdsman” Tripper rounds up the group, keeps everyone in line, sets deadlines, and gets everyone home safe. He might not always need a lasso, but he will get the job done. "},
	{name: "Emmylou", image: "emmylou.png", about: "Emmylou 'the Planner' Tripper doesn’t go anywhere without her calendar book. Everything is meticulously planned out, and if you aren’t on time there will always be an itinerary to get you back on track."},
	{name: "Oliver", image: "oliver.png", about: "Oliver “5-star” Tripper doesn’t stay anywhere lower than a 5-star hotel. Although expense is never a concern, the softness of the bath towels is of utter importance."},
	{name: "Otto", image: "otto.png", about: "Otto “the Wild Card” Tripper is unpredictable, rambocus and partially crazy. And that is exactly why he keeps getting invited back. Although he always leaves a mess the party was well worth the clean up."},
	{name: "Rusty", image: "rusty.png", about: "Rusty “the Wanderer” Tripper has never really had anywhere he has needed to go, but has always enjoyed his varied adventures. He might not necessarily have a plan, but he does always have fun."},
	{name: "Tam", image: "tam.png", about: "Tam “the Pleasant” Tripper is the guy of every group who is always having a good time not matter what the activity. You might not always be having fun, but you can count on having a good time with him. "}
];

var route = '/images/news/'

var index = Math.floor(Math.random()*(platupi.length));

$('#platupi_img').attr('src', route + platupi[index].image)
$('#platupi_info').text(platupi[index].about)
$('#platupi_name').text(platupi[index].name)