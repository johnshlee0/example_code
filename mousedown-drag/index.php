<div class="talkModalGrid">

    <div id="question">
            What would you do with your time if you didn’t have to think about making income?
    </div>
    <div id="talkModalDrag1" class="talkModalDrag t-left-q"></div>
    <div id="talkModalDrag2" class="talkModalDrag t-right-q"></div>
    <div id="talkModalDrag3" class="talkModalDrag t-gap-q-a"></div>


    <form id="input-form" class="form-inline" name="form _id" method="POST" onsubmit="return !!(postData() & clickSubmit());">
        <div class="formGrid">

            <textarea id="answer-text" class="form-control form-control-lg" name="answer" type='text' minlength="1" maxlength="400" size="10" placeholder="Write here ..." pattern="^\d*[a-zA-Z][a-zA-Z0-9]*$"></textarea>
            

            <div id="talkModalDrag4" class="talkModalDrag bottom-a"></div>
            <div id="talkModalDrag5" class="talkModalDrag gap-a-btn"></div>

            <div class="count-btn">
                    <div id="stringCounter" class="letter-count" ></div>
                    
                    <div id="talkModalDrag7" class="talkModalDrag middle-cnt-btn"></div>

                    <button class="submitBtn" type="submit" name="submit">
                        <div class="submit-text">Submit&nbsp;</div>
                        <div class="right-arrow"></div>
                    </button>
            </div>   
            <div id="talkModalDrag6" class="talkModalDrag bot"></div>
        </div>
    </form>

</div>