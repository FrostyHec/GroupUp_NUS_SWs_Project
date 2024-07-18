import { personalInfo } from "@/actions/personal-info";
import { personalInfoDefine } from "@/actions/personal-info";

// Create some data for personal info
  
export const sampleData: personalInfo[] = [
    {
      name: "Alice Johnson",
      personId: 1,
      gender: 0,
      field1Input: "alice.johnson@example.com",
      field2Input: "555-1234",
      field3Input: "123 Maple St, Springfield",
      selfIntroduction: "Hello! I'm Alice, a software developer with a passion for front-end technologies."
    },
    {
      name: "Bob Smith",
      personId: 2,
      gender: 1,
      field1Input: "bob.smith@example.com",
      field2Input: "555-5678",
      field3Input: "456 Oak St, Metropolis",
      selfIntroduction: "Hi, I'm Bob. I love working on backend systems and cloud computing."
    },
    {
      name: "Charlie Brown",
      personId: 3,
      gender: 1,
      field1Input: "charlie.brown@example.com",
      field2Input: "555-9012",
      field3Input: "789 Pine St, Gotham",
      selfIntroduction: "Hey there, I'm Charlie. I'm a full-stack developer and enjoy working with new technologies."
    },
    {
      name: "Diana Prince",
      personId: 4,
      gender: 0,
      field1Input: "diana.prince@example.com",
      field2Input: "555-3456",
      field3Input: "1010 Elm St, Star City",
      selfIntroduction: "Greetings! I'm Diana, a UI/UX designer with a keen eye for detail and a love for user-centered design."
    },
    {
      name: "Ethan Hunt",
      personId: 5,
      gender: 1,
      field1Input: "ethan.hunt@example.com",
      field2Input: "555-7890",
      field3Input: "2020 Birch St, Central City",
      selfIntroduction: "Hi, I'm Ethan. I'm a security expert and enjoy tackling challenging problems."
    }
  ];

  export const sampleInfoDefine: personalInfoDefine[] = [
    {
      surveyId: 1,
      field1Label: "Email",
      field1Placeholder: "Enter your email",
      field1Restriction: "Must be a valid email address",
      field1AllowModify: true,
      field2Label: "Phone",
      field2Placeholder: "Enter your phone number",
      field2Restriction: "Must be a valid phone number",
      field2AllowModify: true,
      field3Label: "Address",
      field3Placeholder: "Enter your address",
      field3Restriction: "Cannot be empty",
      field3AllowModify: true
    },
    {
      surveyId: 2,
      field1Label: "Username",
      field1Placeholder: "Enter your username",
      field1Restriction: "Must be unique",
      field1AllowModify: true,
      field2Label: "Password",
      field2Placeholder: "Enter your password",
      field2Restriction: "Must be at least 8 characters",
      field2AllowModify: true,
      field3Label: "Confirm Password",
      field3Placeholder: "Re-enter your password",
      field3Restriction: "Must match the password",
      field3AllowModify: true
    },
    {
      surveyId: 3,
      field1Label: "First Name",
      field1Placeholder: "Enter your first name",
      field1Restriction: "Cannot be empty",
      field1AllowModify: true,
      field2Label: "Last Name",
      field2Placeholder: "Enter your last name",
      field2Restriction: "Cannot be empty",
      field2AllowModify: true,
      field3Label: "Date of Birth",
      field3Placeholder: "Enter your date of birth",
      field3Restriction: "Must be a valid date",
      field3AllowModify: false
    },
    {
      surveyId: 4,
      field1Label: "Company",
      field1Placeholder: "Enter your company name",
      field1Restriction: "Cannot be empty",
      field1AllowModify: true,
      field2Label: "Job Title",
      field2Placeholder: "Enter your job title",
      field2Restriction: "Cannot be empty",
      field2AllowModify: true,
      field3Label: "Work Email",
      field3Placeholder: "Enter your work email",
      field3Restriction: "Must be a valid email address",
      field3AllowModify: true
    },
    {
      surveyId: 5,
      field1Label: "City",
      field1Placeholder: "Enter your city",
      field1Restriction: "Cannot be empty",
      field1AllowModify: true,
      field2Label: "State",
      field2Placeholder: "Enter your state",
      field2Restriction: "Cannot be empty",
      field2AllowModify: true,
      field3Label: "Country",
      field3Placeholder: "Enter your country",
      field3Restriction: "Cannot be empty",
      field3AllowModify: true
    }
  ];
  
  