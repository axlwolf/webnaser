# Error Recovery Hook

## Trigger

When the application fails with "An unexpected error occurred, please retry"

## Actions

1. Log the error details to error log
2. Attempt to recover from the last known good state
3. Restart the current incomplete task
4. Notify the user of the recovery attempt

## Configuration

- **Event**: Application Error
- **Condition**: Error message contains "An unexpected error occurred, please retry"
- **Auto-execute**: true
- **Retry attempts**: 3
- **Fallback**: Manual intervention required

## Recovery Steps

1. Check system status
2. Verify database connectivity
3. Clear temporary files
4. Restart services if needed
5. Resume from last checkpoint

## Logging

All recovery attempts are logged to `.kiro/logs/error-recovery.log`
