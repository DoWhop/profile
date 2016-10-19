
function addProficiency(index) {
	//make new proficiency thang
	var proflabel = document.createElement('label');
		proflabel.id = 'proficiencylabel'+index;
		proflabel.htmlFor = 'interest_proficiency'+index;
		proflabel.innerHTML = ' Your proficiency: ';
	var interestprof = document.createElement('input');
		interestprof.type = 'range';
		interestprof.name = 'interest_proficiency'+index;
		interestprof.id = 'interest_proficiency'+index;
		interestprof.min = '0';
		interestprof.max = '100';
		interestprof.value = '50';
	//remove button and add proficiency thang
	var interestdiv = document.getElementById('interest'+index);
	var interestbutton = document.getElementById('addproficiency'+index);
	interestdiv.removeChild(interestbutton);
	interestdiv.appendChild(proflabel);
	interestdiv.appendChild(interestprof);
	//fancify button
	interestbutton.innerHTML = 'Remove Proficiency';
	interestbutton.onclick = function() { removeProficiency(index); return(false); };
	//re-add button
	interestdiv.appendChild(interestbutton);
}

function removeProficiency(index) {
	//get elements
	var interestdiv = document.getElementById('interest'+index);
	var proflabel = document.getElementById('proficiencylabel'+index);
	var interestprof = document.getElementById('interest_proficiency'+index);
	var interestbutton = document.getElementById('addproficiency'+index);
	//remove proficiency and fix button
	interestdiv.removeChild(proflabel);
	interestdiv.removeChild(interestprof);
	interestbutton.innerHTML = 'Add Proficiency Level';
	interestbutton.onclick = function() { addProficiency(index); return(false); };
}


function addInterest() {
	//set count on first run
	if(addInterest.firstRun) {
		var temparr = document.getElementById('interestset').value.split(',');
		addInterest.count = +temparr[temparr.length - 1] + 1;
		addInterest.firstRun = false;
	}
	//copy variable locally
	var thecount = addInterest.count;
	//make new interest inputs
	var interestdiv = document.createElement('div');
		interestdiv.id = 'interest'+thecount;
	var removebutton = document.createElement('button');
		removebutton.type = 'button';
		removebutton.id = 'removeinterest'+thecount;
		removebutton.onclick = function() { removeInterest(thecount); return(false); };
		removebutton.innerHTML = 'X';
	var interestwhat = document.createElement('input');
		interestwhat.type = 'text';
		interestwhat.name = 'interest_name'+thecount;
		interestwhat.id = 'interest_name'+thecount;
	var interestblurb = document.createElement('input');
		interestblurb.type = 'text';
		interestblurb.name = 'interest_blurb'+thecount;
		interestblurb.id = 'interest_blurb'+thecount;
	var profbutton = document.createElement('button');
		profbutton.type = 'button';
		profbutton.id = 'addproficiency'+thecount;
		profbutton.onclick = function() { addProficiency(thecount); return(false); };
		profbutton.innerHTML = 'Add Proficiency Level';
	//make new labels
	var whatlabel = document.createElement('label');
		whatlabel.htmlFor = 'interest_name'+thecount;
		whatlabel.innerHTML = ' What you do: ';
	var blurblabel = document.createElement('label');
		blurblabel.htmlFor = 'interest_blurb'+thecount;
		blurblabel.innerHTML = ' A comment about it: ';
	//add new stuff
	var interests = document.getElementById('interests');
	interestdiv.appendChild(removebutton);
	interestdiv.appendChild(whatlabel);
	interestdiv.appendChild(interestwhat);
	interestdiv.appendChild(blurblabel);
	interestdiv.appendChild(interestblurb);
	interestdiv.appendChild(profbutton);
	interests.appendChild(interestdiv);
	//increment counter and add index to list
	var interestset = document.getElementById('interestset');
	if(interestset.value === '')
		interestset.value = thecount;
	else
		interestset.value += ',' + thecount;
	addInterest.count += 1;
}
addInterest.firstRun = true;



function removeInterest(index) {
	//fix interest set
	var interestset = document.getElementById('interestset');
	var theset = interestset.value.split(',');
	for(var i = 0; i < theset.length; ++i) {
		if(theset[i] == index) {
			theset.splice(i, 1);
			break;
		}
	}
	interestset.value = theset.join(',');
	//remove interest
	var interests = document.getElementById('interests');
	var interestdiv = document.getElementById('interest'+index);
	interests.removeChild(interestdiv);
}

