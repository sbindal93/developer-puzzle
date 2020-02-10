What is done well?

	1: The application uses Nx architecture along with Angular7 and NgRx which creates different different application and shared resources like chart , which can be used by future 	 upcoming application if required.
	2: The maintainability of code will be easy as it grows.
	3: Angular Material is used for UX design.
    

What would you change?
	
	1: Required Material Module and common module dependency can be created in new module in shared resources, so that the same can be easily maintained and use by others.
    2: There should be a separate constant file and more use of constant  instead of static content written in Html files and TS file(select dropdown array).
    3: price-query-transformer.util.ts has extra values , which are unused.
	4: Proper Error for better understanding for user.
	
	
Are there any code smells or problematic implementations?

    1: There was an error in testing files, modules were not imported.
    2: There was error/ambiguity in test cases in app.component.specs.ts.
    3: Data binding error in chart component Html.
	4: Implementation of OnDestroy to prevent memory leaks and to un-subscribe observables after use. 
	5: selectedSymbol implementation not used anywhere.
	