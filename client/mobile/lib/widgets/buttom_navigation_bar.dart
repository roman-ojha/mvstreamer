import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import '../assets/icons/bottom_navigation_bar_icon.dart';
import '../services/app_state.dart';
import '../services/redux-actions/actions.dart';

class ButtomNavigationBarWidget extends StatefulWidget {
  const ButtomNavigationBarWidget({Key? key}) : super(key: key);

  @override
  _ButtomNavigationBarWidgetState createState() =>
      _ButtomNavigationBarWidgetState();
}

class _ButtomNavigationBarWidgetState extends State<ButtomNavigationBarWidget> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(right: 13, left: 13),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.centerLeft,
          end: Alignment.centerRight,
          stops: [
            0,
            1,
          ],
          colors: [
            Color(0xffB92E22),
            Color(0xff236FD1),
          ],
        ),
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(50),
          topRight: Radius.circular(50),
        ),
      ),
      child: StoreConnector<AppState, int>(
        converter: (store) => store.state.currentNavigationBarIndex,
        builder: (context, int currentNavigationBarIndex) =>
            BottomNavigationBar(
          currentIndex: currentNavigationBarIndex,
          onTap: (index) {
            StoreProvider.of<AppState>(context).dispatch(
              CurrentNavBarIndexAction(index),
            );
          },
          backgroundColor: Colors.transparent,
          type: BottomNavigationBarType.fixed,
          elevation: 0,
          selectedFontSize: 0,
          unselectedItemColor: const Color(0xdbffffff),
          selectedItemColor: const Color(0xf2ffffff),
          items: const [
            BottomNavigationBarItem(
              icon: Icon(
                BottomNavigationBarIcon.home,
                size: 50,
              ),
              label: "",
            ),
            BottomNavigationBarItem(
              icon: Icon(
                BottomNavigationBarIcon.music,
                size: 40,
              ),
              label: "",
            ),
            BottomNavigationBarItem(
              icon: Icon(
                BottomNavigationBarIcon.setting,
                size: 45,
              ),
              label: "",
            ),
            BottomNavigationBarItem(
              icon: Icon(
                BottomNavigationBarIcon.video,
                size: 45,
              ),
              label: "",
            ),
            BottomNavigationBarItem(
              icon: Icon(
                BottomNavigationBarIcon.file,
                size: 40,
              ),
              label: "",
            ),
          ],
        ),
      ),
    );
  }
}
