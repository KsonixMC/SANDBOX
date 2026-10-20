# SmartElektrik — Technical Specification \& Product Requirements Document

Oct 7, 2026 · @AFLOTUN

SmartElektrik converts an existing wall-switched lighting circuit into a Wi-Fi-controlled, energy-metered node by installing one Aubess Tuya 16 A mini relay module behind the existing switch. The lamp, the cable route and the switch faceplate stay unchanged.

## Document Control

|Field|Value|
|-|-|
|Document type|Technical Specification and Product Requirements Document (hybrid)|
|Project|SmartElektrik|
|Version|1.0, draft for mentor review|
|Audience|Engineering judging panel; project mentor|
|In scope|One single-channel on/off lighting circuit, Tuya / Smart Life platform, Alexa and Google Assistant voice control|
|Out of scope (v1.0)|Dimming, colour control, multi-gang modules, no-neutral installations, custom firmware|
|Requirement keywords|"Shall" = mandatory; "Should" = desirable; "May" = optional|

## 1\. Executive Summary \& Project Objectives

SmartElektrik delivers smart lighting as a retrofit, not a replacement. A conventional lighting circuit has one control point: a mechanical switch that opens or closes the live conductor. SmartElektrik inserts a networked relay between that switch and the lamp, so the circuit gains four control paths (wall switch, mobile app, voice, schedule) and reports its own energy use.

The core component is the Aubess Tuya WiFi Mini Smart Switch, 16 A module. It measures approximately 41 mm x 41 mm x 20 mm and installs inside the existing mounting box behind the switch. Three properties make it suitable as the system's intelligent node:

* **It switches the load itself.** An on-board relay rated for AC 100-240 V, 50/60 Hz and a maximum of 16 A replaces the mechanical switch as the element that makes and breaks the circuit.
* **It keeps the wall switch.** Dedicated switch inputs read the existing switch, including 2-way arrangements, so manual control remains available at all times.
* **It is network-addressable.** A 2.4 GHz Wi-Fi radio (IEEE 802.11 b/g/n) with Bluetooth fast-matching binds the module to the Tuya / Smart Life platform, which provides remote control, scheduling, voice integration and electricity statistics.

### 1.1 Project Objectives

|ID|Objective|Success criterion|
|-|-|-|
|O-1|Retrofit without rewiring|Module installs in the existing mounting box; no new cable runs; original switch retained|
|O-2|Preserve manual control|Wall switch operates the light with Wi-Fi and internet both unavailable|
|O-3|Provide remote and voice control|Light responds to Smart Life app, Amazon Alexa and Google Assistant commands|
|O-4|Automate|Schedules, countdown timers and power-on state memory operate without user action|
|O-5|Make energy use visible|Power and consumption statistics are readable in the app for the connected load|
|O-6|Operate safely within ratings|Connected load never exceeds the design limit defined in Section 5|

## 2\. User Persona \& Real-World Use Cases

SmartElektrik serves two users: the resident who operates the light daily and the installer who commissions it once. The personas below are representative design profiles, not survey data.

### 2.1 Personas

|Persona|Profile|Needs|Constraints|
|-|-|-|-|
|Primary: the resident|Homeowner or tenant, comfortable with smartphone apps, no electrical training|Control lights by phone and voice; automate routines; see what a circuit consumes|Will not replace fixtures or run new cables; expects the wall switch to keep working for family and guests|
|Secondary: the installer|Electrician or supervised student engineer|A module that fits a standard mounting box and pairs in minutes|Must work with existing L, N and switch wiring; must stay inside the circuit's protective ratings|

### 2.2 Use Cases

|ID|Use case|Trigger|System behaviour|Outcome|
|-|-|-|-|-|
|UC-01|Voice command|Resident says "Alexa, turn on the hallway light" or the Google Assistant equivalent|Assistant cloud forwards the command to the Tuya cloud, which instructs the module to close the relay|Hands-free control; app state updates to match|
|UC-02|Remote control|Resident taps the device in Smart Life while away from home|Command travels app -> Tuya cloud -> module over the home internet link|Light switched from any location with internet access|
|UC-03|Remote scheduling|Resident sets "on at 19:00, off at 23:30, weekdays"|Cloud-based schedule issues on/off commands at the set times|Presence simulation and routine lighting with no daily action|
|UC-04|Countdown timer|Resident sets a 30-minute countdown on leaving a room|Module toggles the relay when the countdown expires|Lights are not left on unintentionally|
|UC-05|Power tracking|Resident opens the electricity statistics view|App displays power draw and accumulated consumption for the circuit|Evidence for energy-saving decisions; abnormal draw becomes visible|
|UC-06|Manual override|Anyone presses the wall switch|Module detects the switch input change and toggles the relay locally|Light responds without phone, cloud or Wi-Fi|
|UC-07|Power outage recovery|Mains supply returns after an outage|Module applies the configured power-on behaviour (off, on, or last state)|Predictable state after a blackout|

## 3\. Functional Requirements

The system shall switch a lighting load of up to 16 A, pair to the Tuya platform over 2.4 GHz Wi-Fi, and remain manually operable under every network condition. Numeric response-time values below are project targets to be confirmed by the tests in Section 6; they are not vendor guarantees.

### 3.1 Load Switching

|ID|Requirement|Priority|
|-|-|-|
|FR-01|The system shall switch a single AC load on a supply of 100-240 V, 50/60 Hz.|Shall|
|FR-02|The connected load shall not exceed 16 A, the module's maximum rated current.|Shall|
|FR-03|The system shall operate with a continuous design load at or below the derated limit set in Section 5.1.|Shall|
|FR-04|Relay state shall be reported to the app after every change, whatever the source of the change.|Shall|

### 3.2 Pairing \& Provisioning

|ID|Requirement|Priority|
|-|-|-|
|FR-05|The module shall pair with the Smart Life or Tuya Smart app using Bluetooth fast-matching.|Shall|
|FR-06|The module shall join a 2.4 GHz IEEE 802.11 b/g/n network. 5 GHz-only networks are unsupported.|Shall|
|FR-07|After pairing, the module shall be bound to one Tuya account and appear as a controllable device.|Shall|
|FR-08|The module shall re-enter pairing mode through a documented manual reset procedure.|Shall|
|FR-09|Pairing should complete within 2 minutes of the module being powered.|Should|

### 3.3 Manual Override

|ID|Requirement|Priority|
|-|-|-|
|FR-10|The existing wall switch shall toggle the relay through the module's switch inputs.|Shall|
|FR-11|Manual control shall function with Wi-Fi, internet and the Tuya cloud all unavailable.|Shall|
|FR-12|The system shall support traditional 2-way switching, with two wall switches controlling one light.|Shall|
|FR-13|The relay should respond to a wall-switch action within 200 ms.|Should|
|FR-14|Manual and app actions shall not conflict; the most recent command from any source defines the state.|Shall|

### 3.4 Remote, Voice \& Automation

|ID|Requirement|Priority|
|-|-|-|
|FR-15|The system shall provide on/off control from the Smart Life app from any internet-connected location.|Shall|
|FR-16|The system shall accept on/off voice commands through Amazon Alexa and Google Assistant.|Shall|
|FR-17|The system shall support cloud-based recurring schedules.|Shall|
|FR-18|The system shall support countdown timers.|Shall|
|FR-19|The system shall provide relay state memory, with a user-selectable power-on behaviour after an outage.|Shall|
|FR-20|App and voice commands should take effect within 2 seconds on a healthy connection.|Should|

### 3.5 Energy Monitoring

|ID|Requirement|Priority|
|-|-|-|
|FR-21|The system shall report electricity statistics for the connected load in the app.|Shall|
|FR-22|Reported power should agree with a reference meter within 5% on a resistive test load.|Should|

### 3.6 Non-Functional Requirements

|ID|Requirement|Priority|
|-|-|-|
|NFR-01|The module shall fit inside the mounting box behind the switch (envelope approx. 41 x 41 x 20 mm).|Shall|
|NFR-02|The enclosure shall be flame-retardant (see Section 5.2).|Shall|
|NFR-03|Installation shall require no modification to the lamp or to fixed cabling beyond the switch box.|Shall|
|NFR-04|The module shall rejoin Wi-Fi automatically after a router restart or power cycle.|Shall|

## 4\. Technical Architecture \& Component Breakdown

The architecture has three layers: the mains circuit inside the mounting box, the home 2.4 GHz network, and the Tuya cloud with its client applications. The module is the only component present in both the electrical and the network domain.

\[embedded content: system architecture · 7 components, 3 layers]

Manual switching stays local to the module. App, voice, schedule and statistics functions depend on the router, the internet link and the Tuya cloud.

### 4.1 Component Breakdown

|Component|Role|Key parameters|
|-|-|-|
|Aubess Tuya WiFi Mini Smart Switch (16 A)|Switching node; reads the wall switch, drives the relay, reports state and energy data|AC 100-240 V, 50/60 Hz; 16 A max; approx. 41 x 41 x 20 mm|
|Wi-Fi system-on-chip|Runs Tuya firmware; provides Wi-Fi and Bluetooth radios|Independent teardowns of this model identify a Beken BK7231N ([Elektroda teardown](https://www.elektroda.com/rtvforum/topic3912748.html)); to be confirmed on the project unit|
|Relay|Makes and breaks the switched live conductor|Relay part varies by production batch (Section 5.1)|
|Energy-metering IC|Measures voltage, current and power for electricity statistics|Fitted on energy-monitoring variants; the same teardown thread reports a BL0942|
|Existing wall switch|Manual input to the module|Volt-free contact on the S1 / S2 terminals; 1-way or 2-way|
|Wi-Fi router|Network access for the module|2.4 GHz, IEEE 802.11 b/g/n|
|Tuya IoT cloud|Device registry, command relay, schedules, statistics storage|Reached over the home internet connection|
|Smart Life / Tuya Smart app|Pairing, control, automation setup, statistics display|iOS and Android|
|Amazon Alexa, Google Assistant|Voice front ends|Linked to the Tuya account cloud-to-cloud|

### 4.2 AC Wiring Interface

The module is wired in series with the lamp's live conductor and requires a permanent neutral. Terminal names follow the typical marking for this module class; the label printed on the project unit takes precedence.

|Terminal|Connection|Function|
|-|-|-|
|L (in)|Supply live from the distribution board|Powers the module; source of the switched output|
|N|Supply neutral|Return path for the module's power supply; required for operation|
|L out|Lamp live|Relay-switched output to the lighting load|
|S1, S2|Existing wall switch|Sense inputs; a change of switch position toggles the relay|

Installation constraints:

* A neutral conductor must be present in the mounting box. Boxes with only a switched live loop are out of scope for v1.0.
* The lamp neutral connects to supply neutral as in the original circuit; it does not pass through the relay.
* In a 2-way arrangement, the existing travellers are reused as low-energy sense wiring to S1 / S2 and no longer carry load current.

### 4.3 2.4 GHz Network Dependencies

|Dependency|Requirement|Effect if absent|
|-|-|-|
|Wi-Fi band|2.4 GHz, IEEE 802.11 b/g/n|Module cannot join a 5 GHz-only network; pairing fails|
|Signal at the mounting box|Usable coverage inside a wall recess, behind a faceplate|Device shows offline intermittently; delayed commands|
|Internet uplink|Outbound connectivity to the Tuya cloud|Remote, voice, schedule and statistics functions stop; manual switching continues|
|Bluetooth on the phone|Enabled during pairing|Fast-matching unavailable|

Routers that merge 2.4 GHz and 5 GHz under one network name can disrupt pairing. The commissioning procedure therefore specifies a 2.4 GHz network, or a temporary split of the bands, during setup.

### 4.4 Tuya Cloud Binding

Binding associates one physical module with one Tuya user account. The sequence is:

1. The module is powered and enters pairing mode, advertising over Bluetooth.
2. The Smart Life app discovers the module and sends it the Wi-Fi network name, the password and a one-time pairing token.
3. The module joins the 2.4 GHz network and contacts the Tuya cloud.
4. The cloud validates the token, registers the device against the user's account and issues its device credentials.
5. The module holds a persistent connection to the cloud; commands and status reports are exchanged as Tuya data points.
6. Alexa and Google Assistant are linked to the same Tuya account, which exposes the device to voice control.

The data points below are those of Tuya's standard switch and metering function set. They are listed as the expected interface and shall be confirmed against the project unit in the Tuya developer console.

|Function|Expected data point|Used by|
|-|-|-|
|Relay on/off|`switch\\\_1`|FR-04, FR-15, FR-16|
|Countdown|`countdown\\\_1`|FR-18|
|Power-on behaviour|`relay\\\_status`|FR-19|
|Current, power, voltage|`cur\\\_current`, `cur\\\_power`, `cur\\\_voltage`|FR-21, FR-22|
|Accumulated energy|`add\\\_ele`|FR-21|

### 4.5 Behaviour Under Degraded Conditions

|Condition|Wall switch|App and voice|Schedules|Statistics|
|-|-|-|-|-|
|Normal|Works|Works|Works|Works|
|Internet down, Wi-Fi up|Works|Unavailable|Unavailable (cloud-based)|Not uploaded|
|Wi-Fi down|Works|Unavailable|Unavailable|Not uploaded|
|Mains outage, then restored|Works|Resumes after reconnect|Resumes after reconnect|Resumes|

## 5\. Power Management \& Safety Compliance

The 16 A figure is the module's absolute maximum, not its working point. SmartElektrik operates the module at a derated design load and treats the vendor's safety and compliance markings as claims to be evidenced before the presentation.

### 5.1 Load Budget and the 16 A Limit

|Parameter|Value|Basis|
|-|-|-|
|Rated supply|AC 100-240 V, 50/60 Hz|Device specification|
|Maximum current|16 A|Device specification|
|Maximum resistive power at 230 V|3,680 W (16 A x 230 V)|Calculation|
|Project design limit, continuous|10 A (2,300 W at 230 V)|Derating policy below|
|Expected lighting load|Well under 1 A for a typical LED lighting circuit|To be measured on the demonstration circuit|

Derating policy:

* **Relay variance.** Published teardowns of this model report different relays in different batches: a [SmartHomeScene review](https://smarthomescene.com/reviews/cheapest-wifi-switch-to-buy-for-your-smart-home/) found a 16 A part, while the [Elektroda teardown thread](https://www.elektroda.com/rtvforum/topic3912748.html) reports a 10 A part. Until the relay in the project unit is identified, 10 A is the continuous limit.
* **Load type.** The 16 A rating applies to resistive loads. LED drivers and motors draw inrush currents several times their running current, so they are sized by inrush, not by nameplate wattage.
* **Thermal environment.** A sealed mounting box has little airflow. Sustained operation near the maximum rating raises terminal and relay temperature.
* **Upstream protection.** The circuit's breaker shall be rated at or below 16 A and matched to the cable cross-section. The module provides no overcurrent protection of its own unless the vendor documentation states otherwise.

### 5.2 Fire Safety: Enclosure Material

The device specification lists the enclosure as fireproof "PCV-0" material. This document interprets that marking as flame-retardant polycarbonate (PC) with a UL 94 V-0 flammability classification, the usual meaning of "PC V0" on products of this class. A V-0 material self-extinguishes within seconds on a vertical specimen and does not drop flaming particles. The interpretation is recorded as an open item in Section 7 pending vendor confirmation.

### 5.3 Compliance Markers

The module is sold with CE and RoHS markings. For an engineering audience, a marking is a manufacturer's declaration, not a test result; the supporting documents are what carry weight.

|Marker|What it declares|Evidence to obtain|
|-|-|-|
|CE|Conformity with applicable EU directives; for a mains-powered radio device, chiefly the Radio Equipment Directive 2014/53/EU, which also covers electrical safety and EMC|EU Declaration of Conformity naming the directives and harmonised standards applied|
|RoHS|Restricted substances (lead, mercury, cadmium and others) below the limits of Directive 2011/65/EU|RoHS declaration or test report from the vendor|

Standards a credible Declaration of Conformity for this product class would normally cite include EN 60669-2-1 (electronic switches for fixed installations), EN 300 328 (2.4 GHz radio) and EN 301 489 (radio EMC). SmartElektrik has not independently tested the module against any of them.

### 5.4 Installation Safety Rules

1. Isolate the circuit at the distribution board and prove it dead with a tester before opening the mounting box.
2. Installation is carried out or supervised by a qualified person, in line with local wiring regulations.
3. Conductors are fully inserted and terminal screws tightened; no bare copper is visible outside a terminal.
4. The module is installed indoors, in a dry mounting box, away from sources of heat.
5. The connected load is checked against the design limit in Section 5.1 before energising.
6. Any firmware work in Section 8 is done with the module fully disconnected from mains. The module's low-voltage electronics are not isolated from the supply.

## 6\. Verification \& Acceptance Tests

Each test below maps to requirements in Section 3 and produces a pass/fail result that can be shown to the judging panel. Tests are run on a bench circuit with a known load before any in-wall installation.

|ID|Test|Method|Pass criterion|Covers|
|-|-|-|-|-|
|T-01|Pairing|Power the module; pair through Smart Life with Bluetooth enabled on a 2.4 GHz network; time the process|Device appears in the app, bound to the account, within 2 minutes|FR-05 to FR-09|
|T-02|Manual switching|Operate the wall switch 20 times|Relay toggles every time; app state matches|FR-10, FR-13, FR-14|
|T-03|Offline manual control|Disconnect the router; operate the wall switch|Light responds normally|FR-11|
|T-04|2-way switching|Wire two switches to the switch inputs; operate each in turn|Either switch toggles the light from any state|FR-12|
|T-05|Remote control|Issue 20 on/off commands from a phone on mobile data; record latency|All commands executed; typical latency at or under 2 s|FR-15, FR-20|
|T-06|Voice control|Issue on and off commands through Alexa and through Google Assistant|Both assistants switch the light|FR-16|
|T-07|Schedule and countdown|Set a schedule 5 minutes ahead and a 1-minute countdown|Relay changes state at the set times|FR-17, FR-18|
|T-08|Outage recovery|For each power-on setting, remove and restore mains|Relay state after restore matches the setting|FR-19|
|T-09|Metering accuracy|Run a resistive load of known power; compare app reading with a reference plug-in meter|Reading within 5% of reference|FR-21, FR-22|
|T-10|Wi-Fi recovery|Restart the router|Module returns online without user action|NFR-04|
|T-11|Thermal check|Run the demonstration load for 60 minutes in a closed mounting box; measure enclosure temperature|No discolouration, odour or deformation; temperature recorded for the report|FR-03, NFR-02|

## 7\. Risks \& Open Items

The largest architectural risk is cloud dependency: every smart function except the wall switch stops when the internet link or the Tuya service is unavailable. The roadmap in Section 8 addresses it.

|ID|Risk|Impact|Mitigation|
|-|-|-|-|
|R-1|Cloud dependency|App, voice, schedules and statistics unavailable during an internet or Tuya outage|Manual override always local (FR-11); local-control firmware in Section 8|
|R-2|Hardware variance between batches|Relay rating, SoC or metering IC differs from published teardowns|Open and photograph the project unit; apply the 10 A design limit until confirmed|
|R-3|Unverified compliance claims|CE / RoHS markings unsupported by documents|Request the Declaration of Conformity from the vendor; state verification status openly in the presentation|
|R-4|No neutral at the switch box|Module cannot be powered|Site survey before installation; no-neutral sites out of scope|
|R-5|Weak 2.4 GHz signal in the wall recess|Device intermittently offline|Signal check at the box before installation; reposition router or add an access point|
|R-6|Data leaves the home network|Usage patterns are stored by a third-party cloud|Disclosed to users; removed by the local-control roadmap|

Open items to close before the presentation:

* \[ ] Confirm the project unit is the energy-monitoring variant (statistics visible in Smart Life). If it is not, FR-21, FR-22, UC-05 and T-09 move to the roadmap.
* \[ ] Confirm with the vendor that "PCV-0" denotes PC with a UL 94 V-0 rating.
* \[ ] Identify the relay part number and SoC in the project unit.
* \[ ] Obtain the CE Declaration of Conformity and RoHS declaration.
* \[ ] Record the terminal labels printed on the project unit and update Section 4.2.
* \[ ] Measure the demonstration load and enter it in Section 5.1.

## 8\. Future Roadmap

The roadmap moves SmartElektrik from cloud-dependent to locally controlled operation by replacing the stock Tuya firmware with open firmware and a local MQTT broker. Phases are sequential; each has an exit gate. No dates are committed in v1.0.

|Phase|Scope|Exit gate|
|-|-|-|
|1. Baseline (this document)|Stock Tuya firmware; Smart Life, Alexa and Google Assistant|All Section 6 tests pass|
|2. Hardware characterisation|Open one unit; identify SoC, relay, metering IC and firmware version; back up the original firmware|Chip confirmed as BK7231N-family; verified backup stored|
|3. Open firmware|Flash OpenBK7231N (OpenBeken) or ESPHome; map relay, switch input, LED and metering pins|Relay, wall switch and metering work with no Tuya cloud connection|
|4. Local control|Local MQTT broker; Home Assistant integration via MQTT discovery or the ESPHome API|On/off, schedules and energy data operate with the internet disconnected|
|5. Scale-out|Multiple circuits; scenes and sensor-triggered automations; energy dashboard|Three or more nodes managed from one Home Assistant instance|

### 8.1 Firmware Options

|Option|Description|Fit|
|-|-|-|
|OpenBK7231N (OpenBeken)|Open firmware written for Beken BK7231 chips; web configuration, MQTT, Home Assistant discovery, BL0942 metering driver|Most direct path; this module is documented in the OpenBeken device database|
|ESPHome|YAML-defined firmware; supports BK72xx chips through the LibreTiny platform; native Home Assistant API|Preferred where configuration-as-code and a single toolchain across devices matter|

### 8.2 Flashing Method and Constraints

* **Over-the-air (tuya-cloudcutter).** Replaces the firmware without opening the device, using a published profile for this module. It works only on older stock firmware; a [2024 Elektroda report](https://www.elektroda.com/rtvforum/topic4030917.html) describes a unit on firmware 1.3.10 that the tool did not support.
* **Wired (UART).** A 3.3 V USB-to-serial adapter is connected to the SoC's TX, RX, 3.3 V and GND pads. This works regardless of firmware version and is the fallback.
* **Safety.** Flashing is performed on the bench with the module disconnected from mains, powered only from the 3.3 V adapter.
* **Trade-offs.** Custom firmware removes Smart Life app support and may void any vendor warranty and the manufacturer's conformity declaration for the modified device. Native Alexa and Google Assistant links are replaced by Home Assistant's voice integrations.
* **Metering.** Energy readings require calibration against a reference meter after flashing.

## 9\. Glossary \& Sources

|Term|Meaning|
|-|-|
|2-way switching|Two wall switches controlling one light, for example at each end of a corridor|
|BK7231N|Beken Wi-Fi and Bluetooth LE system-on-chip used in many Tuya devices|
|BL0942|Single-phase energy-metering IC|
|Data point (DP)|A named, typed device property in the Tuya platform|
|MQTT|Lightweight publish/subscribe messaging protocol widely used in IoT|
|UL 94 V-0|Flammability classification for plastics; self-extinguishing on a vertical specimen|
|RED|EU Radio Equipment Directive 2014/53/EU|
|RoHS|EU Restriction of Hazardous Substances Directive 2011/65/EU|

Sources:

* Device specification: values supplied by the project owner from the product listing (dimensions, ratings, connectivity, material, control modes).
* [SmartHomeScene: Aubess 16A Mini Smart Switch review](https://smarthomescene.com/reviews/cheapest-wifi-switch-to-buy-for-your-smart-home/) (relay part, neutral requirement, Home Assistant entities)
* [Elektroda: BK7231N Aubess Mini Switch 16A teardown](https://www.elektroda.com/rtvforum/topic3912748.html) (SoC, relay and metering IC, OpenBeken flashing)
* [Elektroda: 2024 Aubess Mini Smart Switch, firmware 1.3.10](https://www.elektroda.com/rtvforum/topic4030917.html) (cloudcutter limitation)

Teardown findings describe other buyers' units and are indicative only; the project unit is the authority.

