This is demo app for managing desks and employees. To run it use:
yarn
yarn start

Application is made with material ui, react hook form and react router. All business logic is centralized in data provider (normally it would be connected to api through this service) with usage of context (no redux for such simple case).
You have desk list, where you can add new desk (unique number can be set only at the beginning, this is not editable later). Employee has its own internal id, so email can be changed, but must be unique.
You can add preferred desks with checkboxes, and number inputs are for setting order. Generally if you change order of one element, other are shifted, and orders change interactively.

Assign button on Employees page fires desk assignment. Algorithm checks which desks are preferred and which are not (by nobody). Preferred are iterated first, and for each desk employees are ordered in queue, according to rules below:

1. priority for given desk - higher is better
2. alternative desks count - lower is better
3. position on employees list - lower is better

This to ensure optimal users satisfaction: if someone prefers one desk more, will get it first, and if many people place desk on the same rank, if someone has more alternatives (is not so much focused on given desk) will be behind someone who has less or none other favourite desks. If people has equal alternatives, position on the list will decide.

Other (not preferred) desks are given according to employee position on the list, until no desks ara available or every user has one.
