```
                       `..   `..       `..
                       `..   `.. `.  `.
       `..    `. `...`.`. `. `..   `.`. `.   `..
     `..  `..  `..     `..   `..`..  `..   `.   `..
    `..   `..  `..     `..   `..`..  `..  `..... `..
    `..   `..  `..     `..   `..`..  `..  `.
      `.. `...`...      `.. `...`..  `..    `....
```

ArtLife: Computational life as exploratory art

A personal project positioned at the crossroads of computational biology, artificial life, machine learning, digital art and other unrelated interests motivated by exploration and learning.

This is basically a simulator for agent-based models. The agents are biologically-inspired and, naturally, artificial :)  How the various agents learn and behave (and the associated motivators) is a considerable aspect of the exploration and learning that motivates this project. As such, these specifics are still very much open-ended and will no-doubt 'evolve organically'.

In practice, simulation parameters are sent from the browser to the server to start the simulation. The server performs all computations and send batches of results to the browser based on a configurable sample rate. The browser queues up these results and provides control over how they are played back for analysis and entertainment.

The name _ArtLife_ comes from adding an artistic spin to the common term, [alife](http://en.wikipedia.org/wiki/Artificial_life).



_Built using Cloud9 IDE, Socket.IO, node.js, d3.js, Angular.js, Twitter Bootstrap, and Windows Azure._