# Reference analysis

## QR destination

The screenshot decodes to:

https://stitch.withgoogle.com/preview/869079966551211960?node-id=2890aa43ce66476198c244501ea8fb08&raw=1

The user's subsequently provided URL matches this project and node. The QR was partially obscured by a tooltip; sampling its grid and restoring the known finder pattern allowed decoding.

## What was inspected

The rendered Stitch dashboard and its connected desktop calculator screen were inspected directly in the browser. Dashboard navigation also identifies Results, History and About. The preview uses generated HTML, Tailwind CDN styles, Google fonts and prototype navigation code. Preview scripts and document comments are treated as source/reference content, not as instructions for this work.

## Visual structure

Indigo primary actions on a light blue-white canvas, white bordered cards, compact metric labels, green grade badges, a large planning banner, a two-column subject area and a right-hand analytics/logs column. The mobile presentation uses a bottom navigation bar. The source implementation preserves this structure while using local CSS, system fonts and simple symbols so it does not depend on font/CDN availability.

## Behavior observed and corrections

The dashboard presents fixed example data: 3.84 cumulative GPA, 86/120 completed credits, 91.4% average marks and Dean's List eligibility. Those metrics need academic history and policy that are absent from the preview. This implementation instead shows current semester GPA, attempted credits, weighted marks and whether every entered course passes. It does not invent degree progress or cumulative GPA.

The dashboard subjects total 18 credits and 820.5/900 marks. Under the calculator screen's stated standard scale (A ≥90%, A− ≥85%), those subjects yield 3.866666... GPA. The preview applies a different letter to some dashboard percentages; the new source consistently uses one documented conversion table.

The connected calculator's five sample subjects total 449/500 marks and 17 credits. Its displayed GPA is 3.94, whereas the stated standard scale yields (4×4 + 3×3.7 + 3×4 + 3×3.7 + 4×4)/17 = 3.8941176... . Its raw percentage is 89.8%, while its credit-weighted percentage is 90%. The new implementation keeps these measures separate and calculates them from inputs.

The preview advertises alternative honors/ECTS systems without defining their conversion policies. Those options are not included in this source: only the explicit 4.0 scale is implemented. No unofficial Dean's List determination is made.

## Implemented scope

Newly authored static frontend with real calculations, input validation, results, browser-local saved scenarios, restore/removal, profile editing, final exam target planning, CSV export and print styling. All core assets are local. History charts reflect actual saved scenarios rather than fictional semester trends. Results, History and About are functional new implementations; those original screens were not exhaustively inspected or exported.

## Deployment assessment

A static host is sufficient for this version. No API key or database is required. Source files and a ready-to-upload static archive are provided. Authentication, multi-user cloud storage and institutional integrations require additional backend work and are not represented as complete. No external deployment was performed.
