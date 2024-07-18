# Project Title

Team Member:

- Student 1: Zhengdong Huang, t0933325
- Student 2: Hemu Liu, t0933548
- Student 3: Zihang Wu, t0933464
- Student 4: Yicheng Xiao, t0933333

## 1. Project Overview

### 1.1 Project Description

       When our class begins, we are required to find our teammates. It is not uncommon that we tend to naturally group up with someone from the same universities because of familiarity. However, by grouping up like this, we cannot even get to know each other pretty well. Then this idea comes across us: We can design a cloud-based grouping application for this scenario! We aim to design a system where you can find your teammates based on recommendation!

### 1.2 System Architecture

Provide a high-level overview of the system architecture. Describe the major components and how they interact with each other.

```
![Architecture Diagram](./structure.png)
```

### 1.3 Key Components
- **Component 1**: Brief description of the component's functionality.
- **Component 2**: Brief description of the component's functionality.
- **Component 3**: Brief description of the component's functionality.

## 2. Environment Setup

### 2.1 Prerequisites
List all the prerequisites needed to set up the environment.
- **Software 1**: Version and installation link.
- **Software 2**: Version and installation link.
- **Library 1**: Version and installation command.

### 2.2 Installation
Step-by-step guide to setting up the development environment.

1. **Step 1**: Description and command.
    ```bash
    command_to_run
    ```
2. **Step 2**: Description and command.
   
    ```bash
    command_to_run
    ```

## 3. Application Deployment

Detailed steps to deploy the application.

1. **Step 1**: Description and command.
    
    ```bash
    command_to_run
    ```
2. **Step 2**: Description and command.
    ```bash
    command_to_run
    ```
    
3. **Frontend Implementation**: 
    If you want to implement the frontend service, you need to first go in to the root directory and create a `.env.local` file. 
    ```bash
    NEXT_PUBLIC_API_URL= # The backend service API URL.
    MESSAGE_PUSH_API_URL= # The SSE message push service API URL.
    ```
    You can either manually designate the API in the `.env.local` or designate them through DockerFile. You can use the following command to start the progress. Make sure your system has Node.js version larger than `13.5.6`.
    ```bash
    npm install # Install all the dependencies used
    npm run dev # You can run this to modify and test in local environment after connected with backend service. 
    npm run build # You can run this to bundle the project into static files that can be deployed to a production environment.
    ```
    

**Note**: Replace placeholders with actual details relevant to the project. Ensure all commands and links are accurate and up to date.
