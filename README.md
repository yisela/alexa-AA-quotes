# alexa-AA-quotes

---

How to Build a Fact-Based Alexa Skill

We want to introduce another way to help you build useful and meaningful skills for Alexa quickly. We have launched a fact skill template that makes it easy for developers or non-developers to create a skill similar to “Fact of the Day”, “Joke of the Day”, “Daily Reading” etc. The template leverages AWS Lambda the Alexa Skills Kit (ASK) and the ASK SDK while providing the business logic, multiple language support, use cases, error handling and help functions for your skill. You just need to come up with a fact idea (like “Food Facts”), plug in your fact list and edit the sample provided (we walk you through how it’s done). It's a valuable way to quickly learn the end-to-end process for building and publishing an Alexa skill.

This tutorial will walk first-time Alexa skills developers through all the required steps involved in creating a skill using this fact skill template, called ‘SpaceGeek’. This post assumes you have some familiarity with JavaScript/Node.js (or a similar programming language) and the Alexa Skills Kit.

Using the Alexa Skills Kit, you can build an application that can receive and respond to voice requests made on the Alexa platform. In this tutorial, you’ll build a web service to handle notifications from Alexa and map this service to a skill in the Amazon Developer Portal, making it available on your device and to all Alexa users after certification.

After completing this tutorial, you'll know how to do the following:

Create a fact-based skill - This tutorial will walk first-time Alexa skills developers through all the required steps involved in creating a fact-based skill using a template called ‘SpaceGeek’.
Understand the basics of VUI design - Creating this skill will help you understand the basics of creating a working Voice User Interface (VUI) while using a cut/paste approach to development. You will learn by doing, and end up with a published Alexa skill. This tutorial includes instructions on how to customize the skill and submit it for certification. For guidance on designing a voice experience with Alexa you can also watch this video.
Use JavaScript/Node.js and the Alexa Skills Kit to create a skill - You will use the template as a guide but the customization is up to you. For more background information on using the Alexa Skills Kit please watch this video.
Get your skill published - Once you have completed your skill, this tutorial will guide you through testing your skill and sending your skill through the certification process, making it available to be enabled by any Alexa user.
Let's Get Started

Step 1. Setting up Your Alexa Skill in the Developer Portal

Skills are managed through the Amazon Developer Portal. You’ll link the Lambda function you create to a skill defined in the Developer Portal

Navigate to the Amazon Developer Portal. Sign in or create a free account (upper right). You might see a different image if you have registered already or our page may have changed. If you see a similar menu and the ability to create an account or sign in, you are in the right place.


Once signed in, navigate to Alexa and select "Getting Started" under Alexa Skills Kit.


Here is where you will define and manage your skill. Select "Add a New Skill"


Select an initial language you want to support, and then optionally add additional languages later if needed (in Step 6). Make sure the radio button for the custom interaction model is selected for “Skill Type”. Add the name of the skill. You can use “My Fact Skill” for this example. Remember, when you create a skill that you will publish, you will use a name that you define for your skill. That name will be the one that shows up in the Alexa App. Add the invocation name. Since we are using the sample, type “space geek”. Since we will not use Audio Player for this skill, select "No". Note: "Global Fields" information apply to all languages supported by the skill. Finally, select Next.


Now, notice you're in the Interaction Model section.


Next, we need to define our skill’s Interaction Model. Let’s begin with the intent schema. In the context of Alexa, an intent represents an action that fulfills a user’s spoken request. Intents can optionally have arguments called slots. We will not be using custom slots in this template, but they are very useful if you want to parameterize your intents. Note: You will need to define both custom slot type values and sample utterances in language that matches current language tab.
Review the intent schema below. This is written in JSON and provides the information needed to map the intents we want to handle programmatically. Copy this from the intent schema in the GitHub repository here.

You will see the intents for getting a new fact, and then a collection of built-in intents to simplify handling common user tasks. Help intent will handle any time the user asks for help, stop and cancel are built-in intents to make it easier for you to handle when a user wants to exit the application. For more on the use of built-in intents, go here.

{
  "intents": [
    {
      "intent": "GetNewFactIntent"
    },
    {
      "intent": "AMAZON.HelpIntent"
    },
    {
      "intent": "AMAZON.StopIntent"
    },
    {
      "intent": "AMAZON.CancelIntent"
    }
  ]
}
The next step is to build the utterance list.

Given the flexibility and variation of spoken language in the real world, there will often be many different ways to express the same request. Providing these different phrases in your sample utterances will help improve voice recognition for the abilities you add to Alexa. It is important to include as wide a range of representative samples as you can -– all the phrases that you can think of that are possible in use (though do not include samples that users will never speak). Alexa also attempts to generalize based on the samples you provide to interpret spoken phrases that differ in minor ways from the samples specified.

Now it's time to add the utterances. Select and copy/paste the sample utterances from GitHub with your initial language. For example, if your select English (US) as initial language above, then you will need to copy/paste SampleUtterances_en_US.txt in previous link. An example of utterances is listed below. Once they are copied, the screen should look similar to the following image:

GetNewFactIntent a fact
GetNewFactIntent a space fact
GetNewFactIntent tell me a fact
GetNewFactIntent tell me a space fact
GetNewFactIntent give me a fact
GetNewFactIntent give me a space fact
GetNewFactIntent tell me trivia
GetNewFactIntent tell me a space trivia
GetNewFactIntent give me trivia
GetNewFactIntent give me a space trivia
GetNewFactIntent give me some information
GetNewFactIntent give me some space information
GetNewFactIntent tell me something
GetNewFactIntent give me something
Select Save. You should see the interaction model being built (this might a take a minute or two). If you select next, your changes will be saved and you will go directly to the Configuration screen. After selecting Save, it should now look like this:



Next we will configure the AWS Lambda function that will host the logic for our skill.

Step 2: Creating Your Skill Logic Using AWS Lambda

Installing and Working with the Alexa Skills Kit SDK for Node.js (alexa-sdk)

To make the development of skills easier, we have created the ASK SDK for Node.js. We will be using this module to deploy the sample. The Alexa SDK is available on GitHub and can be deployed as a Node package from within your Node.js environment.

Create an AWS Account



Open aws.amazon.com and then choose ‘Create a Free Account’
Follow the online instructions. Do not worry about the IAM role, we will do that later.
You will need a Valid Credit Card to set up your account (note the AWS Free Tier will suffice however. You can find out more about the free tier here.)
Part of the sign-up procedure involves receiving a phone call and entering a PIN using the phone keypad.
Sign in to the AWS Console


It can sometimes take a couple of minutes for your new AWS account to go live. You will receive an e-mail when your account is active.
Create an AWS Lambda Function

AWS Lambda lets you run code without provisioning or managing servers. You pay only for the compute time you consume - there is no charge when your code is not running. With Lambda, you can run code for virtually any type of application or backend service - all with zero administration. Just upload your code and Lambda takes care of everything required to run and scale your code with high availability.

Note: If you are new to Lambda and would like more information, visit the Lambda Getting Started Guide

IMPORTANT: For Regions (upper right) , Select US East (N. Virginia) for US skills and EU (Ireland) for UK/DE skills. These are the only two regions currently supported for Alexa skill development on AWS Lambda, and choosing the right region will guarantee lower latency.


Select Lambda from Compute services (upper left)


Select “Create a Lambda Function” to begin the process of defining your Lambda function.


In the ‘Select Blueprint’ page, filter on 'Alexa', select “alexa-skill-kit-sdk-factskill”. This blueprint is a shortcut to getting the Fact Skill set up for you, and will install the sample code (and dependencies) that are needed for this project.


Now, you need to configure the event that will trigger your function to be called. As we are building skills with the Alexa Skills Kit, click on the gray dash-lined box and select Alexa Skills Kit from the dropdown menu.


Choose Next to continue.


You should now be in the "Configure Function" section. Enter the Name, Description, and select "Node 4.3" as the Runtime for your skill as in the example.


Set your handler and role as follows:

Keep Handler as ‘index.handler’
Drop down the “Role” menu and select “Create a new custom role”. (Note: if you have already used Lambda you may already have a ‘lambda_basic_execution’ role created that you can use.) This will launch a new tab in the IAM Management Console.


You will be asked to set up your Identity and Access Management or “IAM” role if you have not done so. AWS Identity and Access Management (IAM) enables you to securely control access to AWS services and resources for your users. Using IAM, you can create and manage AWS users and groups, and use permissions to allow and deny their access to AWS resources. We need to create a role that allows our skill to invoke this Lambda function. In the Role Summary section, select "Create a new IAM Role" from the IAM Role dropdown menu. The Role Name and policy document will automatically populate.


Select “Allow” in the lower right corner and you will be returned to your Lambda function.


Keep the Advanced settings as default. Select ‘Next’ and review. You should see something like below. Then select ‘Create Function’:


Congratulations, you have created your AWS Lambda function. Copy the ARN for use in the Configuration section of the Amazon Developer Portal.


Step 3: Add Your Lambda Function to Your Skill

Navigate back to developer.amazon.com and select your skill from the list. You can select the skill name or the edit button.


Select the Configuration section. Add the ARN from the Lambda function you created in the AWS Console earlier. Select the Lambda ARN (Amazon Resource Name) radio button and tick the corresponding region. Then, select “No” for account linking since we will not be connecting to an external account for this tutorial. Paste the ARN you copied earlier into the Endpoint field. Then select Next. Note: the region(s) here should match the region(s) of your Lambda function(s).


You have now completed the initial development of your skill. Now it's time to test.
Step 4: Testing Your Skill

In the Test area, we are going to enter a sample utterance in the Service Simulator section and see how Alexa will respond. In this example, we have called the skill ‘Space Geek’. This is the ‘Invocation Name’ we set up in the “Skill Information” section.

In the Service Simulator, type ‘open Space Geek’ and select “Ask My Fact Skill”.


You should see the formatted JSON request from the Alexa Service and the response coming back. Verify that you get a correct Lambda response, and notice the card output. You will want to customize this output later.


(Optional) Testing with your device. This is optional as you can do all the testing in the portal. Assuming your Alexa device is on-line (and logged in with the same account as your developer account), you should now see your skill enabled in the Alexa app and ask Alexa to launch your skill. For more information on testing an Alexa skill and registering an Alexa-enabled device, check here.


Not working (getting an invalid response)?

Do you have the right ARN copied from your Developer Portal/Skill into your your Lambda function?
Are you calling the right invocation name?
Are you saying launch, start or open?
Are you sure you have no other skills in your accounts with the same invocation name?
For this template specifically, you should have a minimum of 20 facts for a good customer experience.
Step 5: Make it Yours

In the Skill Information section in the Developer Console, edit the Skill Information Tab to reflect your new Fact Skill:
Provide a skill name that represents the new skill you are creating.
Come up with a cool Invocation Name that users will use to invoke your skill. Ensure that the invocation name you choose stays clear of pitfalls listed in the table below. Column on the right provides examples of invocation names that will definitely fail certification.


Create a fun icon. Be sure you have the rights to whatever icons you are uploading – you will need to provide both 108x108px and 512x512px images. Need help finding an image? See PixelBay as a possible source for royalty-free images. Use an image editor (such as Paint on Windows or Preview on Mac) to change the size of the image.
Everything else can stay as-is for now in the Developer Portal

[OPTIONAL] If you want to use your own code editor for these next steps, download the code from your Lambda function. From the 'Actions' dropdown choose 'Export Function'. Inside the .zip file you download, you will find the index.js file inside the "src" folder.


On the code tab of your Lambda function in aws.amazon.com (or in your editor), you can edit your code. Look for corresponding locale strings in languageStrings object. "Ctrl-F" en for English and de for German. If there are different expressions between U.S. and U.K, we encourage you to specify them using en-US and en-GB. You can learn more about how language resources are looked up by visiting i18next's documentation. These are the strings you will want to edit to customize this fact for your use.
 

Change the SKILL_NAME variable to the name of your skill.
"SKILL_NAME": "Space Geek"
Edit the strings to contain whatever facts or information you would like to make randomly available when a user invokes your skill. A few suggestions:
Only change the "FACT" array values between the double quotes. These are your facts.
Ensure you don’t accidentally delete any quotes or commas. You can always go back to GitHub and copy it again if you make a mistake.
The skill uses a mathematical randomization on your list of facts. It is a good idea to have at least 20 facts in the skill to ensure that the facts do not repeat too quickly. Also remember that because it is random, it is possible that the same fact can be repeated twice.
For extra credit and completely optional- If you would like to ensure that the facts don’t repeat (for a “Daily Fact Skill” for example), you can use a datastore like DynamoDB to store an id that you can check when the user accesses the skill and iterate through the facts. For more information on using DynamoDB with Lambda, go here.
You will also want to make sure to change the “Space Geek” references to the name of your skill. You don’t have to edit them all, but the following reference changes are required for certification.

Find this code in the HELP_MESSAGE, and change "space fact" to your custom words:
"HELP_MESSAGE" : "You can say tell me a space fact, or, you can say exit... What can I help you with?",
In order to control who accesses your web service, we should validate the Application Id in requests made to your web service. Let’s go back to your Alexa skill in your Developer Portal for a moment. Copy in your Application Id from the ‘Skill Information’ section in your developer portal



Copy the Application Id into the value of the APP_ID variable in index.js. Make sure to place the app id in quotation marks.
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).
A minimum of 20 facts is needed to get started, but about 100 is a good number to keep users engaged. The more the better.

Be sure to select SAVE when you are all done. Note: we test initially in the Developer Portal, not in our Lambda function (AWS).

If you've downloaded your code to use your own editor, log back into your AWS console and copy-and-paste the contents of your index.js file to the Code tab of your Lambda function.



Repeat the tests you performed earlier to ensure your changes are functioning properly. See step 4 for a review of how to performs functional tests.
Step 6: Add Additional Languages (Optional)

You can use the Alexa Skills Kit to create skills in multiple languages. A skill can support a single language, or any combination of the available languages:

English (US)
English (UK)
German
For more on developing skills in multiple languages, go here

To add an additional language, simply select the Add New Language tab and choose your second language. Choose and fill all necessary information like we did for the initial language of your skill. You will need to define Name and Invocation Name for the current language (e.g. German name for German skills). Then click Save to continue. 

In the Interaction Model section, our skill shares the same intent schema and uses different sample utterances and custom slot type values in different languages. Copy intent schema from the intent schema in the GitHub repository here and change sample utterances into your second language. We will not be using custom slots in this template, but slot type values should be put in the new language if your skill has them.



Open the source file for your Lambda function, index.js. In the languageString variable, look up the locale for your current language, edit the facts strings and other message like you did for your initial language. Strings are supposed to be defined using your second language. 

For better latency, deploying your code to different endpoints is recommended. Follow the Create Lambda Function instructions in Step 2 and be sure to select an appropriate Lambda region. Select US East (N. Virginia) for US skills and EU (Ireland) for UK/DE skills. Copy the ARN for use in the Configuration section of the Amazon Developer Portal.

Go back to skill Configuration section, which contains Global fields for all languages. Add an extra endpoint and paste your Lambda ARN. Save your skill configuration information.



Test your skill in the second language using Service Simulator or a device.
Step 7: Publish Your Skill

Now we need to go back to our Developer Portal to test and edit our skill and we will be ready for certification.

In your skills Test section, enter your Utterances into the Simulator to make sure everything is working with your new facts.

Optionally, you can test with your Alexa-enabled device to make sure everything is working correctly. You may find a few words that need to be changed for a better user experience.

Some things to think about:

Is every fact pronounced correctly?
Do you need to change any words to avoid poor pronunciations?
Because we are randomizing our facts, this could take a while. Instead, you can use the Voice Simulator in the Test section to simulate Alexa’s responses. In the Voice Simulator, type in each fact that you are using to test how Alexa will say it. Use additional punctuation or possibly SSML if you need to better control how Alexa responds. You can find out more about SSML here.

Have you added in YOUR Application Id as per the previous instruction?
Select the Publishing Information area of your skill next:



For Global fields, choose an proper category. IMPORTANT: Add the text “This is based on the Fact Skill Template” to the Testing Instructions section. This alerts the Certification team of your submission using this standardized template, smoothing the road to a faster publish. Also select the countries that you want your skill to be available in.



For other publishing information:

Spend some time coming up with an enticing, succinct description. This is the only place you have to attract new users. These descriptions show up on the list of skills available in the Alexa app.

In your example phrases, be sure that the examples you use match the utterances that you created in the Interaction Model section. Remember, there are built-in intents such as help and cancel. You can learn more about built-in intents here. You can also review the list of supported phrases to begin a conversation.

An incorrect example phrase is the most likely reason why your skill submission may fail. Here are the four most important failure points for example phrases.

Example phrases do not adhere to supported phrases.
Example: Alexa start over (You cannot use wake word without the invocation name. Further, start over can be a response from the user when the stream is open, in which case, wake word and invocation name do not make sense.)
Example: Alexa, Social Headline (A supported format would be Alexa, launch Social Headline)
Example phrases are not modeled on sample utterances specified in skill’s intent schema
First example phrase does not contain wake word and invocation name
Example: Incorrect example phrase - Alexa, where can I eat (Missing invocation name)
Example phrases do not provide a contextual response. These are the invariably the phrases users are most likely to try the first time they interact with the skill. Therefore, make sure that they work well and provide a good user experience.
Be sure you have the rights to whatever icons you are uploading – you will need to provide both 108x108px and 512x512px images. If there is any question the Amazon certification team will fail your Alexa skill submission.


Once you have uploaded your icons, you should see a success message at the bottom of the screen. Finally, select Next.

(Optional) For multiple language skill, once you finish and save publishing information for your initial language, you will need to do it again for your second language. Under your second language tab, select publishing infomation, and add additional publishing region(s) to the global fields and all other customer facing information in non-global fields.   

Privacy and Compliance. On the Privacy and Compliance section, select ‘No’ for spending real money and collecting personal information. Privacy and Terms URL’s are optional. Choose to certify that your skill can be imported to and exported from the US.

Select “Save”. If your skill supports multiple languages, then you will need to complete Privacy and Compliance for each language before submission. 

Select “Submit for Certification” 

Finally, confirm your submission. Select “Yes” to submit your skill.

Congratulations! You have successfully submitted your skill for publication. You will receive progress e-mails and possibly other suggestions from the team on how you can make your skill even better. You can update your skills at any time.

Check out These Other Developer Resources

Alexa Skills Kit (ASK)
Alexa Developer Forums
Knowledge Base
Intro to Alexa Skills Kit - On Demand Webinar
Voice Design 101 - On Demand Webinar
Developer Office Hours
Developing Skills in Multiple Languages
