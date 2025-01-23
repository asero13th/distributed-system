// distributed_task_system/frontend/mobile/main.dart

import 'package:flutter/material.dart';
import 'package:web_socket_channel/web_socket_channel.dart';
import 'dart:convert';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Task and Chat Manager',
      home: MainScreen(),
    );
  }
}

class MainScreen extends StatefulWidget {
  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  final _taskChannel =
      WebSocketChannel.connect(Uri.parse('ws://localhost:5000'));
  final _chatChannel =
      WebSocketChannel.connect(Uri.parse('ws://localhost:5000'));
  List tasks = [];
  List chats = [];

  @override
  void initState() {
    super.initState();
    _taskChannel.stream.listen((message) {
      setState(() {
        tasks.add(json.decode(message));
      });
    });
    _chatChannel.stream.listen((message) {
      setState(() {
        chats.add(json.decode(message));
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Task and Chat Manager'),
          bottom: const TabBar(
            tabs: [
              Tab(text: 'Tasks'),
              Tab(text: 'Chat'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            ListView.builder(
              itemCount: tasks.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(tasks[index]['title']),
                  subtitle: Text(tasks[index]['description']),
                );
              },
            ),
            Column(
              children: [
                Expanded(
                  child: ListView.builder(
                    itemCount: chats.length,
                    itemBuilder: (context, index) {
                      return ListTile(
                        title: Text(chats[index]['username']),
                        subtitle: Text(chats[index]['message']),
                      );
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Row(
                    children: [
                      Expanded(
                        child: TextField(
                          decoration: const InputDecoration(
                            labelText: 'Enter message',
                          ),
                          onSubmitted: (value) {
                            _chatChannel.sink.add(json.encode({
                              'username': 'User',
                              'message': value,
                            }));
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    _taskChannel.sink.close();
    _chatChannel.sink.close();
    super.dispose();
  }
}
