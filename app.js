class DrumKit {
	constructor(){
		this.pads = document.querySelectorAll(".pad");
		this.playBtn = document.querySelector(".play");
		//audio elements 
		this.kickAudio =  document.querySelector(".kick-sound");
		this.snareAudio = document.querySelector(".snare-sound");
		this.hihatAudio = document.querySelector(".hihat-sound"); 
		this.currentKick = "./sounds/kick-classic.wav";
		this.currentSnare = "./sounds/snare-acoustic01.wav";
		this.currentHihat = "./sounds/hihat-acoustic01.wav";
		this.index = 0;
		this.bpm = 150;
		this.isPlaying = null;
		this.selects = document.querySelectorAll("select");
		this.muteBtns = document.querySelectorAll(".mute");
		this.tempoSlider = document.querySelector(".tempo-slider");
	}
		activePad(){
		//console.log(this);
		this.classList.toggle("active"); 
		 }

		repeat(){
			let step = this.index % 8;
				const activeBars = document.querySelectorAll(`.b${step}`);
				activeBars.forEach(bar => {
					bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
					//Check if pads are active
					if(bar.classList.contains('active')){
						//check each sound
						if(bar.classList.contains('kick-pad')){
							this.kickAudio.currentTime = ""; //re-starts the track - audio time 
							this.kickAudio.play();
						}
						if(bar.classList.contains('snare-pad')){
							this.snareAudio.currentTime = "";
							this.snareAudio.play();
						}
						if(bar.classList.contains('hihat-pad')){
							this.hihatAudio.currentTime = "";
							this.hihatAudio.play();
						}
					}
				});
				this.index++;
		}

		start(){
		const interval = (60 / this.bpm) * 1000;
    //check if its playing using the interval id
		//NULL
			if(!this.isPlaying){
				this.isPlaying = 	setInterval(() => {
					this.repeat();	
				}, interval);
			} else {
				clearInterval(this.isPlaying);
				this.isPlaying = null;
				//console.log(this.isPlaying);
			}
		}

		updateBtn(){
			if(!this.isPlaying){
				this.playBtn.innerText = "Stop";
				this.playBtn.classList.add("active");
			} else {
				this.playBtn.innerText = "Play";
				this.playBtn.classList.remove("active");
			}
		}

		changeSound(e){
			//console.log(e);
			const selectionName = e.target.name;
			const selectionValue = e.target.value;
			//console.log(selectionValue);
			switch(selectionName){
				case "kick-select":
					this.kickAudio.src = selectionValue;
					break;
				case "snare-select":
					this.snareAudio.src = selectionValue;
					break;
				case "hihat-select":
					this.hihatAudio.src = selectionValue;
					break;
			}
		}

		mute(e){
			const muteIndex = e.target.getAttribute("data-track"); 
				//console.log(muteIndex); o/p -> 0,1,2
				e.target.classList.toggle("active");
				if(e.target.classList.contains("active")){
					switch(muteIndex) {
						case "0":
							this.kickAudio.volume = 0;
							break;
						case "1":
							this.snareAudio.volume = 0;
							break;
						case "2":
							this.hihatAudio.volume = 0;
							break;
					}
				} else {
					switch(muteIndex) {
						case "0":
							this.kickAudio.volume = 1;
							break;
						case "1":
							this.snareAudio.volume = 1;
							break;
						case "2":
							this.hihatAudio.volume = 1;
							break;
					}		
				}
		}
		changeTempo(e){
			const tempoText = document.querySelector('.tempo-nr');
			tempoText.innerText =  e.target.value;
		}

		updateTempo(e){
			this.bpm = e.target.value;
			clearInterval(this.isPlaying);
			this.isPlaying = null;
			const playBtn = document.querySelector(".play");
			if(playBtn.classList.contains('active')){
				this.start();
			}
		}
}
	 //creating an instance of class DrumKit
	 const drumKit = new DrumKit();
   
	 //drumKit.start();

	 //looping over each pad
	  drumKit.pads.forEach(pad => {
	   	pad.addEventListener("click", drumKit.activePad);
			 pad.addEventListener("animationend",function () {
				 this.style.animation= "";
			 });
		});
   
		//applying click method to playBtn  
			//drumKit.playBtn.addEventListener("click",drumKit.start) 
			// the above code will select button only  
		
		drumKit.playBtn.addEventListener("click", function() { 
			drumKit.updateBtn();
			drumKit.start();
		});
		
		// or rewrite above code as  Arrow function below:
			//drumKit.playBtn.addEventListener("click", () => {
			//drumKit.start();
			//})

		drumKit.selects.forEach(select => {
			select.addEventListener("change", function(e){
				drumKit.changeSound(e);
			});
		});

		//mute
		drumKit.muteBtns.forEach(btn => {
			btn.addEventListener("click", function(e){
				drumKit.mute(e);
			});
		});

		//slider  -> try with input and input
		drumKit.tempoSlider.addEventListener('input', function(e){
			drumKit.changeTempo(e);
		})

		drumKit.tempoSlider.addEventListener('change', function(e){
			drumKit.updateTempo(e);
		})