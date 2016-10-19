<?php

//incudes
require_once("common.php");
require_once("page_common.php");

//get profile owner id
$owner = isset($_GET['user']) ? intval($_GET['user']) : '';
if($owner == '') {
	if($USERDATA['userID'] == false)
		header('Location: register.php');
	else
		header('Location: profile.php?user='.$USERDATA['userID']);
	die();
}

//pull up profile owner data
$db = getDatabase();
$statement = $db->prepare('SELECT firstname,lastname,profile_picture,blurb,description,email,phone,address_description,address_line1,address_line2,city,state,zip FROM Profiles WHERE user = :userid');
$statement->bindValue(':userid', $owner, PDO::PARAM_INT);
$statement->execute();
$result = $statement->fetch(PDO::FETCH_ASSOC);
if(!$result) {
	header('Location: editprofile.php');
	die();
}
else {
	//set default values
	$value = array(
		'firstname' => htmlentities($result['firstname']),
		'lastname' => htmlentities($result['lastname']),
		'profile_picture' => htmlentities($result['profile_picture']),
		'blurb' => htmlentities($result['blurb']),
		'description' => htmlentities($result['description']),
		'email' => htmlentities($result['email']),
		'phone' => htmlentities($result['phone']),
		'address_description' => htmlentities($result['address_description']),
		'address_line1' => htmlentities($result['address_line1']),
		'address_line2' => htmlentities($result['address_line2']),
		'city' => htmlentities($result['city']),
		'state' => htmlentities($result['state']),
		'zip' => htmlentities($result['zip'])
	);
	//get interests
	$interest = array();
	$statement = $db->prepare('SELECT id,interest,comment,proficiency FROM Interests WHERE user = :userid');
	$statement->bindValue(':userid', $owner, PDO::PARAM_INT);
	$statement->execute();
	while($result = $statement->fetch(PDO::FETCH_ASSOC)) {
		$interest[$result['id']] = array(
			'interest' => htmlentities($result['interest']),
			'comment' => htmlentities($result['comment']),
			'proficiency' => $result['proficiency']
		);
	}
}


//print header
printHeader("DoWhop | FAQ");
?>




<div id="part1">
	<div id="profileform_basic">
		<div id="nameandpic">
			<h3><?php echo $value['firstname'].' '.$value['lastname'] ?></h3>
			
			<img src="<?php echo $value['profile_picture']; ?>">
			
			<div id="blurb"><?php echo $value['blurb'] ?></div>
		</div>
		<div id="skills">
			<?php
				$count = 0;
				foreach($interest as $id => $prop) {
					if(is_null($prop['proficiency']))
						continue;
					?>
						<div id="skill<?php echo $count; ?>">
							<h5><?php echo $prop['interest']; ?></h5>
							<i><?php echo $prop['comment']; ?></i>
							<input readonly type="range" min="0" max="100" value="<?php echo $prop['proficiency']; ?>">
						</div>
					<?php
					++$count;
				}
			?>
		</div>
	</div>
	<div id="about">
		<div id="description">
			<?php echo $value['description']; ?>
		</div>
		<div id="interests">
			<?php
				foreach($interest as $id => $prop) {
					if(!is_null($prop['proficiency']))
						continue;
					?>
						<div id="interest<?php echo $count; ?>">
							<h5><?php echo $prop['interest']; ?></h5>
							<i><?php echo $prop['comment']; ?></i>
						</div>
					<?php
					++$count;
				}
			?>
		</div>
	</div>
	<div id="verifications">
		<div id="check_verification">
			<?php /*MOSE WARNING: no verifying processes exist yet...*/ ?>
		</div>
		<div id="user_verifications">
		</div>
	</div>
</div>


<?php
printFooter();
?>
