# ProMage

## Description

ProMage allows you to keep track of your projects, assign tasks and
project manager to the project. Promage is a simple tool but is designed to be connected with
other subsystems.

## Features

// add later

## Installation

1. Clone the repository.
2. Install the dependencies.
3. Run the project.

## Notes

Database Choice: MongoDB with Mongoose ODM.

especially when we don't have transactions in our system

**Pros**: Simple to work with, Schema-less so allows flexibility in data structure, performant for real-time applications, scalable

**Cons**: Not suitable for complex transactions and relationships

Event emitting: currently we used appEmitter for simplicity and demo purposes. In production my preference will be a more sphisticated message broker
