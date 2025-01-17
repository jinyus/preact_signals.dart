---
title: Connect
description: Connect a signal to a set of streams
---

## connect

Start with a signal and then use the `connect` method to create a connector.

```dart
final s = signal(0);
final c = connect(s);
```

### to

Add streams to the connector.

```dart
final s = signal(0);
final c = connect(s);

final s1 = Stream.value(1);
final s2 = Stream.value(2);

c.to(s1).to(s2); // These can be chained
```

### dispose

Cancel all subscriptions.

```dart
final s = signal(0);
final c = connect(s);

final s1 = Stream.value(1);
final s2 = Stream.value(2);

c.to(s1).to(s2);

c.dispose(); // This will cancel all subscriptions
```
