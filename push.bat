@echo off
git add .
git -c core.editor=true rebase --continue
git push origin main
