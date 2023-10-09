
<?php 

function getCurlResponseLinkGenerate($cli,$channel) {
	
	$token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2aXZyLmNoYW5uZWwiLCJhdWQiOiJ2aXZyLndlYiIsInVpZCI6IjY5OTNhNmRjOTA1OTZjN2IxZjc0ZmQzOWZhNTYxNWNmIn0.Suo775kFOSki53RqtOD-1eAV_PkwbL9s7BVu5vw3eBk";
	$ch = curl_init('http://192.168.11.35/smart_ivr/public/generate-auth-link'); // Initialise cURL
	$post =['cli'=>$cli,'channel'=>$channel];
	$post = json_encode($post); // Encode the data array into a JSON string
	$authorization = "Authorization: Bearer ".$token; // Prepare the authorisation token
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json' , $authorization )); // Inject the token into the header
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_POST, 1); // Specify the request method as POST
	curl_setopt($ch, CURLOPT_POSTFIELDS, $post); // Set the posted fields
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); // This will follow any redirects
	$result = curl_exec($ch); // Execute the cURL statement
	curl_close($ch); // Close the cURL connection
	return json_decode($result);
	
}

$outputData = "";
	if(isset($_GET['mobile'])){
		
	$cli =$_GET['mobile']?$_GET['mobile']:'';
	$channel = "Web";
	$type = "TESTIVRLINK";
	$link = 'hello' ;
	if ($type == "TESTIVRLINK") { ////CBS
	    $info = getCurlResponseLinkGenerate($cli,$channel);

		//print_r($info);
		$link = $info->data->url;
		$outputData = json_encode($info);
	}
	// echo $result;
	// exit();

	

}


?>

<!doctype html>
<html>
	<head>
	<link rel="stylesheet" href="/glink/style.css">


	<style>
		html{
			height: 100%;
		}
		body{
			min-height: 100vh;
		}

		#card{
			display: block;
			margin-top: 100px;
			min-height: 100vh;
		}
	</style>
	</head>

	<body>

<div class="container">
	<div id="card" class="row">
	<div class="col-md-5 mx-md-auto">


	<div  class="card py-5 px-3">
		<form>
			<div class="form-group" action="#" method="POST">
			
				<input placeholder="Enter Your Mobile Number" class="form-control" type="text" id="mobile" name="mobile" required><br>
			</div>
				
			<div class="form-group text-center">
				<button class=" btn btn-success" type="submit">Submit</button>
				<a class=" btn btn-danger" href="sivr_demo_link.php">Reset</a>
			</div>

			<div>
				<p>Output Data: </p>
				<a target="_blank" href="http://192.168.11.35/<?php echo $link;?>"> http://192.168.11.35/<?php echo $link;?> </a>
				
			</div>
				
			
		</form>
	</div>
		
	</div>
	</div>
</div>


		
	</body>
</html>

