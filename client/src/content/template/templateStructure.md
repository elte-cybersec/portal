# templateStructure.md

# README Structure Guide for Portal Parsing

This file explains the exact README format that should be followed so the portal can parse repository data correctly and generate:

- project cards
- project metadata
- topic navigation
- topic pages
- future course-style layouts

If a README does not follow this structure, the portal may miss topics, read sections incorrectly, or fail to show metadata properly.

---

## 1. Required overall structure

Each README should follow this order:

1. One document title using `#`
2. Optional short introduction text
3. Optional manual table of contents
4. Main content topics using `##`
5. Optional subtopics using `###`
6. Metadata block at the very end

---

## 2. Heading rules

### `#` Document title
Use `#` only once, at the very top of the README.

Example:

```md
# Full 5G Implementation Installation Guide
```

Do not use another `#` later in the document.

Bad:

```md
# Full 5G Implementation Installation Guide

# Configuration
# Troubleshooting
```

Good:

```md
# Full 5G Implementation Installation Guide

## Configuration
## Troubleshooting
```

---

### `##` Main topics
Use `##` for all main topics.

These become the main entries in the portal sidebar.

Example:

```md
## Overview
## System Requirements
## Hardware Setup
## Configuration
## Validation & Testing
## Troubleshooting
## References
```

---

### `###` Subtopics
Use `###` for subtopics inside a `##` topic.

These become child entries under the nearest `##`.

Example:

```md
## Software Installation

### 1. Operating System
### 2. Dependencies
### 3. Network Stack Components
```

---

## 3. Table of Contents

A manual table of contents is allowed, but it is ignored by the parser for the page.

If included, it should be written as a normal `##` section.

Example:

```md
## Table of Contents
```

or

```md
## 📦 Table of Contents
```

Everything inside that section is ignored until the next `##`.

This means the real structure is always taken from the actual headings, not from the written table of contents.

---

## 4. Content rules

### Text under `##`
Any normal text under a `##` heading belongs to that topic.

Example:

```md
## Overview

This project demonstrates...
```

### Text under `###`
Any normal text under a `###` heading belongs to that child topic.

Example:

```md
### 1. Operating System

Install Ubuntu Server on all nodes.
```

### Code blocks
Code blocks are fully allowed.

The parser ignores heading-like lines inside fenced code blocks.

Example:

```bash
# this is NOT treated as a topic
sudo apt update
```

So code blocks are safe to use for:
- bash
- diff
- json
- sql
- python
- ini
- and other fenced blocks

---

## 5. Metadata block at the end

Every README must end with a metadata section.

This metadata is used for:
- project card title
- card summary
- dates
- repository link
- logos

### Required heading

Use this exact heading:

```md
## PORTAL_METADATA
```

### Required fenced block

Immediately below it, use this exact fenced block:

````md
```portal
...
```
````

### Metadata block example

````md
## PORTAL_METADATA

```portal
slug: full-5g-implementation
title: Full 5G Implementation
summary: Installation, configuration, and validation guide for a 5G testbed environment using Open5GS and UERANSIM.
startDate: 2025-02-01
endDate: 2025-06-30
repositoryUrl: https://github.com/example/full-5g-implementation
logos:
  - open5gs.png
  - ueransim.png
```
````

---

## 6. Supported metadata fields

The parser currently supports these fields:

- `slug`
- `title`
- `summary`
- `startDate`
- `endDate`
- `repositoryUrl`
- `logos`

### `slug`
Must match the markdown file name without `.md`.

Example:

- file name: `full-5g-implementation.md`
- slug: `full-5g-implementation`

### `title`
Used as the project title inside the portal.

### `summary`
Used as the short project description on cards.

### `startDate` and `endDate`
Use this exact format:

```txt
YYYY-MM-DD
```

Example:

```txt
2025-02-01
```

### `repositoryUrl`
Public repository URL.

Example:

```txt
https://github.com/example/full-5g-implementation
```

### `logos`
List only the image file names, not full paths.

Example:

```md
logos:
  - open5gs.png
  - ueransim.png
```

---

## 7. Logo file placement

Logos must be stored in the public folder using this format:

```txt
public/projects/<slug>/<logo-file>
```

Example:

```txt
public/projects/full-5g-implementation/open5gs.png
public/projects/full-5g-implementation/ueransim.png
```

Important:
- folder name must match the metadata slug exactly
- file names must match the metadata logo names exactly

---

## 8. Recommended full README example

```md
# Full 5G Implementation Installation Guide

This document provides a full walkthrough for installing and configuring the 5G testbed environment.

## Table of Contents

1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Hardware Setup](#hardware-setup)
4. [Software Installation](#software-installation)
5. [Configuration](#configuration)
6. [Validation & Testing](#validation--testing)
7. [Troubleshooting](#troubleshooting)
8. [References](#references)

## Overview

This project demonstrates...

## System Requirements

### Tested Specs

- OS: Ubuntu 24.04
- RAM: 1GB
- Disk: 20GB free

## Hardware Setup

### Components

- Raspberry Pi Zero W
- VMWare Host

## Software Installation

### 1. Operating System

Install Ubuntu...

### 2. Dependencies

Install required packages...

### 3. Network Stack Components

The 5GC, UE, and RAN components used are...

## Configuration

### Open5GS 5GC C-Plane

Configuration steps here...

### Open5GS 5GC U-Plane

Configuration steps here...

### RAN

Configuration steps here...

### UE

Configuration steps here...

## Validation & Testing

### Running the RAN

Command here...

### Running the UE

Command here...

## Troubleshooting

Common issues and solutions...

## References

- [Open5GS](https://...)
- [UERANSIM](https://...)

## PORTAL_METADATA

```portal
slug: full-5g-implementation
title: Full 5G Implementation
summary: Installation, configuration, and validation guide for a 5G testbed environment using Open5GS and UERANSIM.
startDate: 2025-02-01
endDate: 2025-06-30
repositoryUrl: https://github.com/example/full-5g-implementation
logos:
  - open5gs.png
  - ueransim.png
```
```

---

## 9. Things to avoid

### Avoid multiple `#` headings
Bad:

```md
# Title
...
# Configuration
# Troubleshooting
```

### Avoid using `##` only as wrappers if they are not real topics
Bad:

```md
## Changes in configuration files of Open5GS 5GC C-Plane
### Setting Up TUN Device
### Configuration Change
```

Better:

```md
## Configuration

### Open5GS 5GC C-Plane
### Setting Up TUN Device
### Configuration Change
```

### Avoid putting metadata anywhere except the end
Bad:
- metadata in the middle of the file
- multiple metadata blocks

### Avoid missing closing code fences
Every fenced block must be properly closed.

---

## 10. Final rule

The parser works best when the README follows this simple hierarchy:

- `#` = document title only
- `##` = main topics
- `###` = child topics
- `## PORTAL_METADATA` = metadata section at the end

If this structure is followed consistently, the portal can parse the README safely and build a clean project-based teaching interface.
